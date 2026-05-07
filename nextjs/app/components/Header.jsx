"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      setHasToken(!!t);
    } catch (e) {
      setHasToken(false);
    }
  }, [pathname]);

  if (pathname === "/login" || pathname === "/register") return null;

  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      // ignore errors, we'll remove token anyway
    } finally {
      try { localStorage.removeItem("token"); } catch (e) {}
      router.push("/login");
    }
  }

  return (
    <header className="border-b border-black/10 bg-white text-black font-sans">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <Link className="flex items-center gap-4" href="/">
          <Image src="/images/appLogo.png" alt="logo Nuliz" width={70} height={70} />
          <span className="text-lg font-semibold">Nuliz</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            className="p-3 btn btn-ghost rounded-full border border-black text-black hover:bg-black hover:text-white"
            href="/posts/create"
          >
            Mulai
          </Link>
          {hasToken && (
            <button
              onClick={handleLogout}
              className="p-3 ml-2 btn btn-black rounded-full border border-black bg-black text-white hover:bg-white hover:text-black"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
