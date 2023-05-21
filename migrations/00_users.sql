-- migrate:up

-- users table

create type user_role as enum ('user', 'admin');

create table "users" (
  "id" uuid references auth."users" not null primary key,
  "email" text not null,
  "role" user_role not null default 'user'
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
    "role"
  ) values (
    new."id",
    new."email",
    'user'
  ) on conflict ("id") do update set
    "email" = excluded."email";
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

create policy "Admins have full control over users."
on "users" for all using (is_admin());

create policy "Users can view their own profiles."
on "users" for select using (auth.uid() = "id");

create view admin_users as
select
  u."id",
  u."email",
  u."role",
  au."created_at",
  au."last_sign_in_at"
from "users" u
left join auth."users" au on au."id" = u."id"
where is_admin();

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

create policy "Admins have full access to storage."
on storage.objects for all using (is_admin());

-- migrate:down