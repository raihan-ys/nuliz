<h1>Nuliz - Web based Blogging Application</h1>
<p>Aplikasi ini dikembangkan oleh saya untuk memenuhi sebuah technical test. env diconfig untuk local.</p>

<h2>Tech Stack</h2>
<ul>
    <li>PHP 8.2</li>
    <li>MySQL</li>
    <li>Laravel 12</li>
    <li>Next.js</li>
    <li>Tailwind CSS</li>
</ul>

<h2>Fitur</h2>
<ul>
    <li>CRUD Postingan: User dapat membuat, membaca, memperbarui, dan menghapus postingan mereka sendiri.</li>
    <li>Autentikasi: User dapat register, login dan logout.</li>
    <li>API Terproteksi: Semua endpoint post dilindungi dengan token akses yang dihasilkan saat login.</li>
    <li>UI Responsif (Made with DaisyUI).</li>
    <li>NOTE: fitur komentar masih dalam tahap pengembangan.</li>
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
1. Pastikan PHP 8.2, MySQL, dan Node.js sudah terinstall di local machine.
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