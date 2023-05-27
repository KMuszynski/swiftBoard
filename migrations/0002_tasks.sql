-- migrate:up

create table "tasks" (
  "id" uuid primary key default uuid_generate_v4(),
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now(),

  "company" uuid not null references "companies"("id") on delete cascade,
  "name" text not null,
  "description" text not null,
  "documents" text[] not null default '{}'::text[],
  "max_points" int not null default 0, -- number of points granted depends on the time to deadline
  "min_points" int not null default 0,
  -- "number_of_questions" int not null default 0,
  -- "questions" text[] not null default '{}'::text[]
);

create type task_status as enum ('assigned', 'completed', 'failed');

create table "user_tasks" (
  "task" uuid not null references "tasks"("id") on delete cascade,
  "user" uuid not null references "users"("id") on delete cascade,
  primary key ("task", "user"),

  "assigned_at" timestamptz not null default now(),
  "completed_at" timestamptz,
  "deadline" timestamptz, -- null means no deadline
  "status" task_status not null default 'assigned',
  "raport" text
);

create or replace function "get_remaining_task_points"("task_id" uuid, "user_id" uuid)
  returns int
  language sql
as $$
  select
    case
      when "deadline" is null then "max_points"
      else "min_points" + (
        ("max_points" - "min_points") *
        extract(epoch from("deadline" - now())) / extract(epoch from(("deadline" - "assigned_at")))
      )::int
    end
  from "user_tasks" ut
  inner join "tasks" t on t."id" = ut."task"
  where ut."task" = task_id and ut."user" = user_id;
$$;

create view "employee_tasks" as
select
  ut."task" as "id",
  ut."user",
  ut."assigned_at",
  ut."deadline",
  ut."status",
  ut."raport",
  t."company",
  t."name",
  t."description",
  t."documents",
  get_remaining_task_points(ut."task", ut."user") as "points"
from "user_tasks" ut
inner join "tasks" t on t."id" = ut."task";
-- where ut."user" = auth.uid()
-- or ut."user" in ( -- admin can view employees' tasks
--   select cu."user" from "company_users" cu 
--   where cu."user" = auth.uid() and cu."role" = 'admin'
-- );

create or replace function "get_user_assignable_tasks"("user_id" uuid, "company_id" uuid)
  returns table("id" uuid, "name" text)
  language plpgsql
  security definer
as $$
begin
  return query 
  select
    distinct t."id",
    t."name"
  from "tasks" t
  where t."company" = "company_id" and t."id" not in (
    select "task" from "user_tasks" where "user" = "user_id"
  );
end
$$;

-- migrate:down
