<h1>Nuliz - Web based Blogging Application</h1>
<p>Aplikasi ini dikembangkan oleh saya untuk memenuhi sebuah technical test. env diconfig untuk local.</p>

<h2>Tech Stack</h2>
<ul type="square">
    <li>PHP 8.2 (Karena beberapa project local saya masih pakai versi ini, jadi saya tahan dulu untuk upgrade). Download di:...</li>
    <li>MySQL 8.0.42. Download di... </li>
    <li>Laravel 12 (Laravel 13 tidak support 8.2). Cara install: masuk ke direktori project, lalu...</li>
    <li>Next.js. . Cara install: masuk ke direktori project, lalu... . Di terminal lakukan command npm install untuk mengunduh semua dependencies yang dibutuhkan.<</li>
    <li>Tailwind CSS Lakukan command... (tailwind and daisyUI)</li>
    <li>Docker...</li>   
</ul>

<h2>Features</h2>
<ul type="square">
    <li>CRUD Postingan: User dapat membuat, membaca, memperbarui, dan menghapus postingan mereka sendiri.</li>
    <li>CRUD komentar untuk postingan</li>
    <li>Token-based auth menggunakan Laravel Sanctum</li>
    <li>API Terproteksi: Semua endpoint post dilindungi dengan token akses yang dihasilkan saat login.</li>
    <li>UI Responsif (Made with DaisyUI).</li>
</ul>

<h2>Cara menjalankan di local machine (with Docker)</h2>
<pre><code>
1. Pastikan Docker sudah terinstall di local machine.
2. Clone repository ini.
3. Jalankan perintah `docker-compose up --build` untuk memulai container.
4. Buka aplikasi di `http://localhost`.
5. Untuk setup Laravel, buka terminal dan jalankan `docker compose exec php sh` untuk masuk ke container PHP, lalu jalankan:
   - `composer install`
   - `php artisan key:generate`
   - `php artisan migrate --seed`
</code></pre>

<h2>Cara menjalankan tanpa Docker</h2>
<pre><code>
1. Pastikan PHP 8.2, MySQL, dan Node.js sudah terinstall di perangkat.
2. Clone repository ini.
3. Setup Laravel:
   - Masuk ke folder `laravel` dan copy `.env.example` ke `.env`, lalu sesuaikan konfigurasi database.
   - Jalankan `composer install`, `php artisan key:generate`, dan `php artisan migrate --seed`.
   - Jalankan `php artisan serve` untuk memulai server.
4. Setup Next.js:
   - Masuk ke folder `nextjs` dan jalankan `npm install`.
   - Jalankan `npm run dev` untuk memulai development server.
5. Buka aplikasi di `http://localhost:3000` di browser.
6. Aplikasi siap digunakan.
</code></pre>
