-- migrate:up

insert into storage.buckets ("id", "name")
values ('companies', 'companies');

create table "companies" (
  "id" uuid default uuid_generate_v4() primary key,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),
  "name" text not null,
  "description" text not null,
  "logo" text
);

create table "company_documents" (
  "id" uuid default uuid_generate_v4() primary key,
  "created_at" timestamptz not null default now(),
  "company" uuid not null references "companies"("id") on delete cascade,
  "name" text not null,
  "path" text not null
);

create table "company_positions" (
  "id" uuid primary key default uuid_generate_v4(),
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),

  "company" uuid not null references "companies"("id") on delete cascade,
  "name" text not null,
  "responsibilities" text[] not null default '{}'::text[],
  "requirements" text[] not null default '{}'::text[]
);

create type company_user_role as enum ('admin', 'employee');

create table "company_users" (
  "user" uuid not null references "users"("id") on delete cascade,
  "company" uuid not null references "companies"("id") on delete cascade,
  primary key ("user", "company"),

  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),
  "role" company_user_role not null default 'employee',
  "position" uuid references "company_positions"("id") on delete set null,
  "responsibilities" text[] not null default '{}'::text[], -- extra
  "requirements" text[] not null default '{}'::text[], -- extra
  "points" int not null default 0
);

create or replace function "upsert_company"(
  "name" text,
  "description" text,
  "company_id" uuid default uuid_generate_v4()
)
  returns jsonb
  language plpgsql
  security definer
as $$
begin

  insert into "companies" (
    "id",
    "name",
    "description"
  ) values (
    "company_id",
    "name",
    "description"
  ) on conflict ("id") do update set
    "name" = excluded."name",
    "description" = excluded."description",
    "updated_at" = now();

  -- make the user who created the company an admin
  insert into "company_users" ("user", "company", "role")
  values (auth.uid(), "company_id", 'admin')
  on conflict ("user", "company") do nothing;

  return jsonb_build_object(
    'success', true,
    'id', "company_id" -- returning id in order to upload the logo
  );
end
$$;

create or replace function "upsert_company_user"(
  "company_id" uuid,
  "email" text,
  "role" company_user_role,
  "responsibilities" text[],
  "requirements" text[],
  "position" uuid default null
)
  returns jsonb
  language plpgsql
  security definer
as $$
begin
  insert into "company_users" (
    "user",
    "company",
    "role",
    "position",
    "responsibilities",
    "requirements"
  ) values (
    (select "id" from "users" where users."email" = upsert_company_user."email"),
    "company_id",
    "role",
    "position",
    "responsibilities",
    "requirements"
  ) on conflict ("user", "company") do update set
    "user" = excluded."user",
    "company" = excluded."company",
    "role" = excluded."role",
    "position" = excluded."position",
    "responsibilities" = excluded."responsibilities",
    "requirements" = excluded."requirements",
    "updated_at" = now();

  return jsonb_build_object('success', true);
end
$$;

drop view if exists user_profile;
create view user_profile as
select
  u."id",
  u."email",
  u."role",
  u."full_name",
  generate_user_avatar_url(u."id") as "avatar_url",
  cu."company",
  cu."role" as "company_role",
  cp."name" as "position",
  cu."points"
from "users" u
left join "company_users" cu on cu."user" = u."id"
left join "companies" c on c."id" = cu."company"
left join "company_positions" cp on cp."id" = cu."position"
where auth.uid() = u."id";

create view company_info as
select
  c."id",
  c."name",
  c."description",
  generate_signed_file_url('companies', c."logo") as "logo"
from "companies" c
left join "company_users" cu on cu."company" = c."id"
where cu."user" = auth.uid();

create view company_employees as
select
  u."id",
  u."email",
  u."full_name",
  generate_user_avatar_url(u."id") as "avatar_url",
  cu."company",
  cu."role",
  cp."id" as "position_id", 
  cp."name" as "position_name", 
  cu."responsibilities", 
  cu."requirements",
  cu."points",
  ut."task_statuses"
from "company_users" cu
left join "users" u on u."id" = cu."user"
left join "companies" c on c."id" = cu."company"
left join "company_positions" cp on cp."id" = cu."position" 
left join lateral(
  select array_agg(ut."status") as "task_statuses"
  from "user_tasks" ut
  where ut."user" = cu."user"
) ut on true;

create view "company_documents_signed" as
select
  cd."id",
  cd."created_at",
  cd."company",
  cd."name",
  cd."path",
  generate_signed_file_url('companies', cd."path") as "url"
from "company_documents" cd
inner join "company_users" cu on cu."company" = cd."company" 
where cu."user" = auth.uid();

-- migrate:down
