-- migrate:up

create table "companies" (
  "id" uuid references auth."users" not null primary key,
  "name" text not null,
  "description" text not null,
  "documents" []jsonb
);

create type company_user_role as enum ('admin', 'employee');

create table "company_users" (
  "user" uuid references "users" not null,
  "company" uuid references "companies" not null
  primary key ("user", "company"),

  "role" company_user_role not null default 'employee'
);



-- migrate:down
