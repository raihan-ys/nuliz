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
            'created_by' => 'required|exists:users,id',
        ]);
        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'created_by' => 'required|exists:users,id',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(null, 204);
    }
}