"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Gagal memuat post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div className="p-6">Memuat...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!post) return <div className="p-6">Tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="prose prose-sm">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="mt-2 text-sm text-black/70">Oleh {post.author?.name ?? post.author ?? "Unknown"}</div>
          </header>

          {/* Hero image for the post goes here */}
          <div className="mb-6">
            <Image src="" alt="post hero" width={800} height={300} />
          </div>

          <section className="mb-8">
            <div className="text-black/90 whitespace-pre-wrap">{post.content}</div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Komentar ({(post.comments || []).length})</h2>
            <div className="mt-4 space-y-4">
              {(post.comments || []).length === 0 && <div className="text-black/70">Belum ada komentar.</div>}
              {(post.comments || []).map((c) => (
                <div key={c.id} className="border border-black p-4">
                  <div className="text-sm font-semibold">{c.author ?? "Anonim"}</div>
                  <div className="mt-2 text-sm text-black/80">{c.content}</div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
