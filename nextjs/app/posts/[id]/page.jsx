"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage() {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`);
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

  async function handleDelete() {
    setDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Gagal menghapus post");
      }

      router.push("/posts");
      return;
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="prose prose-sm">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <div className="mt-2 text-sm text-black/70">Oleh {post.author?.name ?? post.author ?? "Unknown"}</div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/posts/${id}/edit`} className="btn btn-ghost rounded-full border border-black text-black hover:bg-black hover:text-white">
                Edit
              </Link>
              <button
                className="btn rounded-full border border-black bg-black text-white hover:bg-white hover:text-black"
                onClick={() => setShowDeleteModal(true)}
              >
                Hapus
              </button>
            </div>
          </header>

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

      {/* Delete confirmation modal */}
      <div className={showDeleteModal ? "modal modal-open" : "modal"}>
        <div className="modal-box text-center bg-white text-black">
          <h3 className="font-bold text-lg">Hapus post?</h3>
          <p className="py-4">Apakah Anda yakin ingin menghapus post ini? Operasi ini tidak bisa dibatalkan.</p>

          {deleteError && <div className="text-red-600 mb-2">{deleteError}</div>}

          <div className="modal-action justify-center">
            <button className="btn btn-ghost rounded-full border border-black" onClick={() => setShowDeleteModal(false)}>
              Tidak
            </button>
            <button className="btn rounded-full bg-black text-white hover:bg-white hover:text-black" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
