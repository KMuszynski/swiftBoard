#!/bin/bash
set -euxo pipefail

mkdir /etc/postgresql/conf.d

cd /config
chmod +x ./generate-env-config.sh
bash ./generate-env-config.sh -o /etc/postgresql/conf.d/env.conf

echo "include_dir '/etc/postgresql/conf.d'" >> /etc/postgresql/postgresql.conf

docker-entrypoint.sh -c config_file=/etc/postgresql/postgresql.conf -c log_min_messages=fatal