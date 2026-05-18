<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::withCount('comments')
            ->with(['user:id,name'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Use 'writer' for user's name instead of 'created_by' for frontend convenience
        $posts->getCollection()->transform(function ($post) {
            $post->writer = $post->user->name ?? null;
            return $post;
        });

        return response()->json($posts, 200);
    }

    public function show($id)
    {
        $post = Post::with(['user:id,name', 'comments'])->withCount('comments')->findOrFail($id);
        $post->writer = $post->user->name ?? null;

        return response()->json($post, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Use authenticated user as the writer of the post
        $user = $request->user();
        $post = Post::create(array_merge($validated, ['created_by' => $user->id]));

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        // Check if the authenticated user is the writer of the post
        $user = $request->user();
        if ($post->created_by !== $user->id) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk mengedit postingan ini'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $post->update($validated);

        return response()->json($post, 200);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);

        $user = request()->user();
        if ($post->created_by !== $user->id) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk menghapus postingan ini'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Postingan berhasil dihapus'], 200);
    }
}
