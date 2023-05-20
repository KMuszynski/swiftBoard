-- users table

create type user_role as enum ('user', 'admin');

create table "users" (
  "id" uuid references auth."users" not null primary key,
  "email" text not null,
  "role" user_role not null default 'user',
  "avatar_url" text, -- avatar from social provider
  "avatar_override" text -- avatar explicitly set by the user
);
alter table "users" enable row level security;

create index "users_email" on "users" ("email");

create function handle_new_user()
  returns trigger
  language plpgsql
  security definer
as $$
begin
  insert into public."users" (
    "id",
    "email",
    "avatar_url",
    "role"
  ) values (
    new."id",
    new."email",
    new."raw_user_meta_data"->>'avatar_url',
    'user'
  ) on conflict ("id") do update set
    "email" = excluded."email",
    "avatar_url" = excluded."avatar_url";
  return new;
end;
$$ ;

create trigger "on_auth_user_created"
after insert or update on auth."users"
for each row execute procedure public."handle_new_user"();

create or replace function get_user_role("user_id" uuid)
  returns text
  stable
  language sql
  security definer
as $$
  select "role"
  from public."users"
  where "id" = $1
$$;

create or replace function is_admin()
  returns boolean
  stable
  language sql
  security definer
as $$
  select "role" = 'admin'
  from public."users"
  where "id" = auth.uid()
$$;

create policy "Admins have full control over users."
on "users" for all using (is_admin());

create policy "Users can view their own profiles."
on "users" for select using (
  auth.uid() = "id"
);

-- storage setup

create or replace function get_env("env" text)
  returns text language sql
as $$
    select current_setting('env.' || "env");
$$;

create or replace function "generate_signed_file_url"("bucket_name" text, "path" text)
  returns text
  language plpgsql
  stable
  parallel safe
  security definer
as $$
begin
  if "path" is null or "path" = '' then
    return null;
  end if;

  return concat(
    get_env('api_objects_sign_url'),
    "bucket_name",
    "path",
    '?token=',
    extensions.sign(
      json_build_object(
        'url', concat("bucket_name", "path"),
        'iat', extract(epoch from now()),
        'exp', extract(epoch from now() + get_env('signed_url_expiry_time'))
      ),
      get_env('supabase_jwt_secret')
    )
  );
end
$$;

insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Admins have full access to storage."
on storage.objects for all using (is_admin());

create policy "User avatars can be selected by their owners."
on storage.objects for select using (
  "bucket_id" = 'avatars'
  and "name" like concat('users/', auth.uid()::text, '/%')
);

create policy "User avatars can be inserted by their owners or admins."
on storage.objects for insert with check (
  "bucket_id" = 'avatars'
  and auth.uid() is not null
  and "name" like concat('users/', auth.uid()::text, '/%')
);

create or replace function generate_user_avatar_url("user_id" uuid)
  returns text
  language plpgsql
  security definer
as $$
declare
  avatar_url text;
  avatar_override text;
begin
  select
    u."avatar_url",
    u."avatar_override"
  from "users" u
  where u."id" = "user_id"::uuid
  into avatar_url, avatar_override;

  if avatar_url is null and avatar_override is null
  then
    return null; -- empty url
  end if;

  if avatar_url is not null and avatar_override is null
  then
    return avatar_url;
  end if;

  return generate_signed_file_url('avatars', avatar_override);
end;
$$;

create view user_profile as
select
  u."id",
  u."email",
  u."role",
  generate_user_avatar_url(u."id") as "avatar_url"
from "users" as u
where auth.uid() = u."id";

create view admin_users as
select
  u."id",
  u."email",
  u."role",
  generate_user_avatar_url(u."id") as "avatar",
  au."created_at",
  au."last_sign_in_at"
from "users" u
left join auth."users" au on au."id" = u."id"
where is_admin();
