-- migrate:up

-- users table

create type user_role as enum ('user', 'admin');

create table "users" (
  "id" uuid references auth."users" not null primary key,
  "email" text not null,
  "role" user_role not null default 'user',
  "full_name" text not null,
  "avatar_url" text, -- avatar from social provider
  "avatar_override" text -- avatar explicitly set by the user
);
-- alter table "users" enable row level security;

create index "users_email" on "users" ("email");

create or replace function handle_new_user()
  returns trigger
  language plpgsql
  security definer
as $$
begin
  insert into public."users" (
    "id",
    "email",
    "avatar_url",
    "full_name",
    "role"
  ) values (
    new."id",
    new."email",
    new."raw_user_meta_data"->>'avatar_url',
    new."raw_user_meta_data"->>'full_name',
    'user'
  ) on conflict ("id") do update set
    "email" = excluded."email",
    "avatar_url" = excluded."avatar_url",
    "full_name" = excluded."full_name";
  return new;
end
$$;

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

-- create policy "Admins have full control over users."
-- on "users" for all using (is_admin());

-- create policy "Users can view their own profiles."
-- on "users" for select using (auth.uid() = "id");

-- storage setup

create table "secrets" (
  "name" text primary key,
  "value" text not null,
  "created_at" timestamptz not null default now()
);

insert into "secrets" ("name", "value") values
('signed_url_expiry_time', '48 hour'),
('api_objects_sign_url', 'https://gvarhvvtbitlbuwueihk.supabase.co/storage/v1/object/sign/');

create or replace function get_secret("secret" text)
  returns text language sql
as $$
    select "value" from "secrets" where "name" = "secret"; -- TODO:
$$;

-- create policy "Admins have full access to storage."
-- on storage.objects for all using (is_admin());

-- TEMPORARY:
create policy "Everyone has full access to storage objects."
on storage.objects for all using (true);

create policy "Everyone has full access to storage buckets."
on storage.buckets for all using (true);

insert into storage.buckets (id, name)
values ('avatars', 'avatars');

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
    get_secret('api_objects_sign_url'),
    "bucket_name",
    "path",
    '?token=',
    extensions.sign(
      json_build_object(
        'url', concat("bucket_name", "path"),
        'iat', extract(epoch from now()),
        'exp', extract(epoch from now() + get_secret('signed_url_expiry_time')::interval)
      ),
      get_secret('supabase_jwt_secret')
    )
  );
end
$$;

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

-- create view admin_users as
-- select
--   u."id",
--   u."email",
--   u."role",
--   au."created_at",
--   au."last_sign_in_at"
-- from "users" u
-- left join auth."users" au on au."id" = u."id"
-- where is_admin();

create view user_profile as
select
  u."id",
  u."email",
  u."role",
  u."full_name",
  generate_user_avatar_url(u."id") as "avatar_url"
from "users" as u
where auth.uid() = u."id";

-- migrate:down
