Docker Compose for Nuliz (Laravel + Next.js)

Quick start (development):

1. Copy the Laravel docker env sample to `laravel/.env` and adjust any secrets:

   cp laravel/.env.docker laravel/.env

2. Build and start the stack:

   docker compose up --build

3. In a separate terminal, run Laravel setup (inside `php` container):

   # open a shell in php container
   docker compose exec php sh

   # inside container
   composer install
   php artisan key:generate
   php artisan migrate --seed

4. The services:
   - Laravel: http://localhost:8000
   - Next.js: http://localhost:3000
   - MySQL: 3306 (hosted in container)

Notes:
- `NEXT_PUBLIC_API_URL` is set to `http://localhost:8000` in `docker-compose.yml` for local dev.
- The `next` service runs the dev server (`npm run dev`) so changes in `nextjs` are reflected immediately.
- For production, replace `npm run dev` with `npm run build && npm start` and adjust `NODE_ENV`.
- If you use Laravel Sail or other environment, adjust accordingly.
