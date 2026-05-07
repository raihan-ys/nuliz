"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || JSON.stringify(data));

      setMessage({ type: "success", text: `Token: ${data.access_token}` });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <header className="mb-8 flex flex-col items-center">
          <Image src="/images/appLogo.png" alt="Nuliz logo" width={72} height={72} />
          <h1 className="mt-4 text-2xl font-bold">Masuk ke Nuliz</h1>
          <p className="text-sm text-black/70">Masukkan kredensial untuk melanjutkan.</p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
              placeholder="email@contoh.com"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button className="btn rounded-full bg-black text-white px-6 py-2" disabled={loading}>
              {loading ? "Proses..." : "Masuk"}
            </button>
            <a className="text-sm hover:underline" href="/register">
              Buat akun
            </a>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-3 rounded ${message.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
