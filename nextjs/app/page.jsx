import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="mx-auto max-w-6xl px-6 py-20">
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Mulai nulis,
              <br />
              ceritakan kisahmu
            </h1>
            <p className="mt-6 max-w-xl text-lg text-black/80">
              Nuliz adalah tempat untuk menulis ide, berbagi cerita, dan terhubung
              dengan pembaca. Tampilan sederhana, fokus pada tulisanmu,
              dan siap dipakai kapan saja.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                id="get-started"
                className="p-3 btn rounded-full border border-black bg-black text-white hover:bg-white hover:text-black"
                href="/posts/create"
              >
                Mulai Menulis
              </Link>
              <Link className="p-3 btn btn-ghost rounded-full border border-black" href="/posts">
                Jelajahi Tulisan
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Image
              src="/images/appPoster.png"
              alt="Ilustrasi menulis"
              width={410}
              height={300}
            />
          </div>
        </section>

        <section id="features" className="mt-20">
          <h2 className="text-2xl font-bold">Keunggulan Nuliz</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card border border-black p-6">
              <h3 className="text-lg font-semibold">Antarmuka Minimal</h3>
              <p className="mt-2 text-sm text-black/75">Fokus pada tulisan tanpa gangguan.</p>
            </div>

            <div className="card border border-black p-6">
              <h3 className="text-lg font-semibold">Publikasi Mudah</h3>
              <p className="mt-2 text-sm text-black/75">Bagikan cerita dan dapat pembaca.</p>
            </div>

            <div className="card border border-black p-6">
              <h3 className="text-lg font-semibold">Ubah Sesukamu</h3>
              <p className="mt-2 text-sm text-black/75">Ubah tulisanmu kapan saja.</p>
            </div>
          </div>
        </section>

         <section id="posts" className="mt-20">
          <h2 className="text-2xl font-bold">Contoh Postingan</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <article className="rounded border border-black p-6">
              <h2 className="text-lg font-semibold">Judul Post Pertama</h2>
              <div className="mt-2 text-sm text-black/70">
                Oleh John Doe • 0 komentar - Dibuat pada 1 Januari 2024
              </div>
              <p className="mt-4 text-black/80">Ini adalah cuplikan singkat dari postingan pertama.</p>
            </article>

            <article className="rounded border border-black p-6">
              <h2 className="text-lg font-semibold">Judul Post Kedua</h2>
              <div className="mt-2 text-sm text-black/70">
                Oleh Jane Smith • 0 komentar - Dibuat pada 2 Januari 2024
              </div>
              <p className="mt-4 text-black/80">Ini adalah cuplikan singkat dari postingan kedua.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
