<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Routing\Controller;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::join('posts', 'posts.id', '=', 'comments.post_id')
            ->join('users', 'users.id', '=', 'comments.created_by')
            ->select('comments.*', 'users.name as writer')
            ->orderBy('content')
            ->paginate(10);

         return response()->json($comments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
        ]);

        // Use authenticated user as the writer of the comment
        $user = $request->user();
        $validated['created_by'] = $user->id;

        Comment::create($validated);

        return response()->json(['message' => 'Komentar berhasil ditambahkan'], 201);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $validated = $request->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
        ]);

        // Check if the authenticated user is the writer of the comment
        $user = $request->user();
        if ($comment->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->update($validated);

        return response()->json(['message' => 'Komentar berhasil diperbarui']);
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        // Check if the authenticated user is the writer of the comment
        $user = $request->user();
        if ($comment->created_by !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $comment->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus']);
    }
}   