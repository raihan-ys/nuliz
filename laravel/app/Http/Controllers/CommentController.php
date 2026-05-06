<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::join('posts', 'posts.id', '=', 'comments.post_id')
            ->join('users', 'users.id', '=', 'comments.created_by')
            ->select('comments.*', 'users.name as author')
            ->orderBy('content')
            ->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'created_by' => 'required|exists:users,id',
        ]);

        Comment::create($validated);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $validated = $request->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'created_by' => 'required|exists:users,id',
        ]);

        $comment->update($validated);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
    }
}   