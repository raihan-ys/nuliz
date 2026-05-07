"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:8000/api/posts");
        if (!res.ok) throw new Error("Gagal memuat post");
        const data = await res.json();
        // Laravel paginator returns { data: [...], ... }
        setPosts(data.data ?? data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Truncate post content if words exceed n characters
  function truncate(text, n = 200) {
    if (!text) return "";
    return text.length > n ? text.slice(0, n) + "…" : text;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Semua Post</h1>
          <Link href="/posts/create" className="btn rounded-full border border-black bg-black text-white">
            Buat Post
          </Link>
        </div>

        <div className="mt-6">
          {loading && <div>Memuat...</div>}
          {error && <div className="text-red-600">{error}</div>}

          <div className="mt-4 grid gap-4">
            {posts.length === 0 && !loading ? (
              <div className="text-black/70">Belum ada post.</div>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="border border-black p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">
                        <Link href={`/posts/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      <div className="mt-2 text-sm text-black/70">
                        Oleh {post.author?.name ?? post.author ?? "Unknown"} • {post.comments_count ?? 0} komentar
                      </div>
                      <p className="mt-4 text-black/80">{truncate(post.content, 200)}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
