"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePostPage() {
  const router = useRouter();
  const [createdBy, setCreatedBy] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }

    // fetch current user to get id for created_by
    (async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(String(res.status));
        const u = await res.json();
        setCreatedBy(u.id);
      } catch (err) {
        // if user can't be retrieved, force login
        router.replace('/login');
      }
    })();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content, created_by: createdBy }),
      });

      if (!res.ok) throw new Error(String(res.status));

      const data = await res.json();
      setMessage({ type: 'success', text: 'Tulisan selesai!' });
      router.push(`/posts/${data.id}`);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <header className="mb-6 flex flex-col items-center">
          <Image src="/images/writingPoster.png" alt="create post banner" width={120} height={80} />
          <h1 className="mt-4 text-2xl font-bold">Buat Post Baru</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Judul</span>
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Judul tulisanmu..."
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Konten</span>
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="textarea textarea-bordered w-full bg-white text-black h-48"
              placeholder="Tulis ceritamu di sini..."
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="btn rounded-full bg-black text-white px-6 py-2 hover:bg-white hover:text-black" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-3 rounded ${message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
