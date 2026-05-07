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

        // Use 'author' for user's name instead of 'created_by'
        $posts->getCollection()->transform(function ($post) {
            $post->author = $post->user->name ?? null;
            return $post;
        });

        return response()->json($posts);
    }

    public function show($id)
    {
        $post = Post::with(['user:id,name', 'comments'])->withCount('comments')->findOrFail($id);
        $post->author = $post->user->name ?? null;

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // use authenticated user as owner to prevent spoofing
        $user = $request->user();
        $post = Post::create(array_merge($validated, ['created_by' => $user->id]));

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        // only owner may update
        $user = $request->user();
        if ($post->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        // only owner may delete
        $user = request()->user();
        if ($post->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}