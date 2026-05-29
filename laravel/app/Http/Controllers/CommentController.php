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
            'content' => 'required|string'
        ]);

        // Check if the authenticated user is the writer of the comment
        $user = $request->user();
        if ($comment->created_by !== $user->id) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk mengedit komentar ini'], 403);
        }

        $comment->update($validated);

        return response()->json(['message' => 'Komentar berhasil diperbarui'], 200);
    }

    public function destroy(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        // Check if the authenticated user is the writer of the comment
        $user = $request->user();
        if ($comment->created_by !== $user->id) {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk menghapus komentar ini'], 403);
        }
        
        $comment->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus'], 200);
    }
}
