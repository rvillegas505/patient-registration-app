#!/usr/bin/env sh
set -euo pipefail

echo "[entrypoint] Waiting for database ${DB_HOST}:${DB_PORT:-5432}..."
until nc -z -v -w30 "${DB_HOST}" "${DB_PORT:-5432}" >/dev/null 2>&1; do
  echo "[entrypoint] DB is unavailable - sleeping"
  sleep 2
done
echo "[entrypoint] Database is up!"

if [ ! -f "/var/www/html/.env" ] && [ -f "/var/www/html/.env.docker" ]; then
  cp /var/www/html/.env.docker /var/www/html/.env
fi

php artisan key:generate --force --no-ansi || true
php artisan migrate --force --no-ansi || true
php artisan storage:link --force --no-ansi || true

exec "$@"


