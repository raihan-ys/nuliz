"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        setTitle(data.title || "");
        setContent(data.content || "");
        setCreatedBy(data.created_by ?? data.created_by);

        try {
          const ures = await fetch('http://localhost:8000/api/user', { headers: { Authorization: `Bearer ${token}` } });
          if (!ures.ok) throw new Error(String(ures.status));
          const udata = await ures.json();
          const currentUserId = udata.id;
          const ownerId = data.created_by ?? data.user?.id;
          if (ownerId !== currentUserId) {
            router.replace(`/posts/${id}`);
            return;
          }
        } catch (e) {
          router.replace('/login');
          return;
        }
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        throw new Error(String(res.status));
      }

      const updated = await res.json();
      router.push(`/posts/${id}`);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Memuat...</div>;

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <header className="mb-6 flex flex-col items-center">
          <Image src="/images/writingPoster.png" alt="edit post banner" width={120} height={80} />
          <h1 className="mt-4 text-2xl font-bold">Edit Post</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label"><span className="label-text">Judul</span></label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul tulisanmu..." className="input input-bordered w-full bg-white text-black" />
          </div>

          <div>
            <label className="label"><span className="label-text">Konten</span></label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full bg-white text-black h-48" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="btn rounded-full bg-black text-white px-6 py-2" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</button>
            <button type="button" className="btn btn-ghost rounded-full" onClick={() => router.back()}>Batal</button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-3 rounded ${message.type === "error" ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>{message.text}</div>
        )}
      </div>
    </div>
  );
}
