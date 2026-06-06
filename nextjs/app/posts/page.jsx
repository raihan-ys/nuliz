"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    async function load(page = 1) {
      // Get client's token
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/api/posts?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(String(res.status));
        
        const data = await res.json();
        const list = data.data ?? data;
        setPosts(list);
        // Set pagination when using Laravel pagination
        if (data.current_page !== undefined) {
          setCurrentPage(data.current_page);
          setLastPage(data.last_page);
        } else if (data.meta) {
          setCurrentPage(data.meta.current_page);
          setLastPage(data.meta.last_page);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load(currentPage);
  }, [router]);

  async function goToPage(page) {
    if (page < 1 || page > lastPage) return;
    setLoading(true);
    setError(null);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/posts?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const list = data.data ?? data;
      setPosts(list);
      if (data.current_page !== undefined) {
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
          <Link href="/posts/create" className="btn rounded-full border border-black bg-black text-white hover:bg-white hover:text-black">
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
              posts.map((post, i) => (
                <article key={post.id} className="rounded border">
                  <div className="bg-black text-white p-3">
                    <span className="font-bold"># {i + 1}</span>
                  </div>
                  <div className="flex items-start gap-4 p-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">
                        <Link href={`/posts/${post.id}`} className="hover:underline">
                          {truncate(post.title, 200)}
                        </Link>
                      </h2>
                      <div className="mt-2 text-sm text-black/70">
                        Oleh {post.writer?.name ?? post.writer ?? "Unknown"} • {post.comments_count ?? 0} komentar - Dibuat pada {new Date(post.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <p className="mt-4 text-black/80" dangerouslySetInnerHTML={{ __html: truncate(post.content, 200) }} />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
          
          {/* Pagination controls */}
          {lastPage > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="btn btn-sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
                Prev
              </button>

              {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`btn btn-sm ${p === currentPage ? 'bg-black text-white' : 'btn-ghost'}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              ))}

              <button className="btn btn-sm" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= lastPage}>
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
