<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    
    public function index()
    {
        $posts = Post::join('users', 'users.id', '=', 'post.created_by')
            ->orderBy('title')
            ->get();
        $users = User::orderBy('name')->get();
        $comments = Comment::orderBy('content')->get();
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        $user = User::findOrFail($post->created_by);
        $comments = Comment::where('post_id', $id)->orderBy('content')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'created_by' => 'required|exists:users,id',
        ]);

        Post::create($validated);
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
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
    }
}