"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage() {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const router = useRouter();

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
        setPost(data);

        // Fetch current user id to determine ownership
        try {
          const ures = await fetch('http://localhost:8000/api/user', { headers: { Authorization: `Bearer ${token}` } });
          if (ures.ok) {
            const udata = await ures.json();
            setCurrentUserId(udata.id);
          }
        } catch (e) {
          // ignore
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);
  
  if (loading) return <div className="p-6 text-center text-xl">Memuat...</div>;
  if (error) return <div className="p-6 text-red-600 text-center text-xl">{error}</div>;
  if (!post) return <div className="p-6 text-center text-xl">Tidak ditemukan</div>;

  async function handleDelete() {
    setDeleting(true);
    setDeleteError(null);

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(String(res.status));
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
              <div className="mt-2 text-sm text-black/70">
                Oleh {post.writer?.name ?? post.writer ?? "Anonim"} - {new Date(post.created_at).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                  className="btn btn-outline btn-sm rounded-full"
                  onClick={() => setShowCommentModal(true)}
                >
                  Tambah Komentar
                </button>
              { (currentUserId && (post.created_by === currentUserId || post.user?.id === currentUserId)) && (
                <>
                  <Link href={`/posts/${id}/edit`} className="btn btn-ghost rounded-full border border-black text-black hover:bg-black hover:text-white">
                    Edit
                  </Link>
                  <button
                    className="btn rounded-full border border-black bg-black text-white hover:bg-white hover:text-black"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Hapus
                  </button>
                </>
              )}
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
                  <div className="text-sm font-semibold">{c.writer ?? "Anonim"}</div>
                  <div className="text-xs text-black/70 mb-2">{new Date(c.created_at).toLocaleString()}</div>
                  <div className="mt-2 text-sm text-black/80">{c.content}</div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

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

        <div className={showCommentModal ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white text-black max-w-2xl mx-auto">
            <h3 className="font-bold text-lg">Tambahkan Komentar</h3>
            <p className="py-2 text-sm text-black/70">Tulis komentar Anda untuk post ini.</p>

            {commentError && <div className="text-red-600 mb-2">{commentError}</div>}

            <form onSubmit={async (e) => {
              e.preventDefault();
              setPostingComment(true);
              setCommentError(null);
              try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                const postId = id;

                if (!token) {
                  router.replace('/login');
                  return;
                }

                const cres = await fetch(`http://localhost:8000/api/comments/`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ content: commentText, post_id: postId }),
                });

                if (!cres.ok) throw new Error(String(cres.status));

                // Refresh post
                const pres = await fetch(`http://localhost:8000/api/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                if (!pres.ok) throw new Error(String(pres.status));
                const pdata = await pres.json();
                setPost(pdata);
                setCommentText("");
                setShowCommentModal(false);
              } catch (err) {
                setCommentError(err.message);
              } finally {
                setPostingComment(false);
              }
            }} className="space-y-4 mt-4">
              <div>
                <label className="label"><span className="label-text">Komen...</span></label>
                <textarea required value={commentText} onChange={(e) => setCommentText(e.target.value)} className="textarea textarea-bordered w-full bg-white border border-black text-black h-32" />
              </div>

              <div className="flex items-center justify-center gap-4">
                <button type="submit" className="btn rounded-full bg-black text-white hover:bg-white hover:text-black" disabled={postingComment}>{postingComment ? 'Mengirim...' : 'Kirim'}</button>
                <button type="button" className="btn btn-ghost rounded-full" onClick={() => setShowCommentModal(false)}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
