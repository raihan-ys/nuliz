import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="border-b border-black/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Image src="/images/appLogo.png" alt="logo Nuliz" width={70} height={70} />
            <span className="text-lg font-semibold">Nuliz</span>
          </div>
          <div className="flex items-center gap-3">
            <a className="text-sm hover:underline" href="#features">
              Fitur
            </a>
            <a
              className="p-3 btn btn-ghost rounded-full border border-black text-black hover:bg-black hover:text-white"
              href="/login"
            >
              Mulai
            </a>
          </div>
        </nav>
      </header>

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
              <a
                id="get-started"
                className="p-3 btn rounded-full border border-black bg-black text-white hover:bg-white hover:text-black"
                href="/login"
              >
                Mulai Menulis
              </a>
              <a className="p-3 btn btn-ghost rounded-full border border-black" href="#learn-more">
                Pelajari Lebih Lanjut
              </a>
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
      </main>

      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-6xl p-6 text-center text-black/70 font-bold">© {new Date().getFullYear()} Nuliz</div>
      </footer>
    </div>
  );
}
