"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirm,
                }),
            });

            const data = await res.json().catch(() => ({}));

            // if backend returned non-ok, surface the HTTP status code
            if (!res.ok) throw new Error(String(res.status));

            setMessage({ type: "success", text: "Akun berhasil dibuat!" });
            // store token for protected API calls
            try { localStorage.setItem('token', data.access_token); } catch (e) {}
            router.push('/posts');
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
            <div className="w-full max-w-md p-8">
                <Link className="mb-8 flex flex-col items-center" href="/">
                    <Image src="/images/appLogo.png" alt="Nuliz logo" width={72} height={72} />
                    <h1 className="mt-4 text-2xl font-bold">Daftar ke Nuliz</h1>
                    <p className="text-sm text-black/70">Mulai nulis dan bagikan kisahmu.</p>
                </Link>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                        <span className="label-text">Nama</span>
                        </label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered w-full bg-white text-black"
                            placeholder="Nama lengkap"
                        />
                    </div>

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
                            placeholder="Minimal 8 karakter"
                        />
                    </div>

                    <div>
                        <label className="label">
                        <span className="label-text">Konfirmasi Password</span>
                        </label>
                        <input
                            required
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="input input-bordered w-full bg-white text-black"
                            placeholder="Ulangi password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="btn rounded-full bg-black text-white px-6 py-2 hover:bg-white hover:text-black" disabled={loading}>
                            {loading ? "Proses..." : "Daftar"}
                        </button>
                        <a className="text-sm hover:underline" href="/login">
                            Sudah punya akun?
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
