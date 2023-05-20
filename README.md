```
____________ _____         _ ______  ____                       __
  _________ / ___/      __(_) __/ /_/ __ )____  ____ __________/ /
   ________ \__ \ | /| / / / /_/ __/ __  / __ \/ __ `/ ___/ __  /
     _____ ___/ / |/ |/ / / __/ /_/ /_/ / /_/ / /_/ / /  / /_/ /
       __ /____/|__/|__/_/_/  \__/_____/\____/\__,_/_/   \__,_/
```

## About

SwiftBoard is an onboarding platform that utilizes AI to make the onboarding process as straight-forward as possible for the employers as well as the onboarded employees.

The project started as a challenge in the _Hack na Zdrowie 2_ hackathon organized by the Medical University of Łódź, Poland

## Prerequisites

The development environment can be run on any UNIX OS,
on top of that the following dependencies are required:

- [Docker](https://www.docker.com/products/docker-desktop)
- [NodeJS >= 18.15.0](https://nodejs.org)

## Supabase setup

```bash
# contact @bnowacki for the missing env vars
cp .env.example .env

# copy kong configuration file
# you will need to replace ANON_KEY and SERVICE_KEY with values from .env
cp ./docker/volumes/api/kong.example.yml ./docker/volumes/api/kong.yml

# run supabase services
docker compose up -d

# migrate the database
make migrate DB_URI="postgres://postgres:postgres@localhost:5432/postgres"
```

## Running the app

Frontend of the application resides in the `/web` directory and is powerd by:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux](https://redux.js.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Supabase-js](https://supabase.com/docs/reference/javascript/introduction)

```bash
# to run the web client
cd web
npm i
npm run dev
```

## Mark yourself as an admin

After logging in / creating your account on the website, run the following SQL query to mark your account as an administrator:

```sql
update "users" set "role" = 'admin' where 'email' = 'youremail'
```
