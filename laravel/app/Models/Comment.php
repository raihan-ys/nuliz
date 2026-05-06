<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'post_id',
        'content',
        'created_by'
    ];

    /**
     * Get the user that owns the comment.
     */
    public function user()
    {
        // Define one-to-many relation with users table.
        return $this->belongsTo(User::class);
    }

    /**
     * Get the post that owns the comment.
     */
    public function post()
    {
        // Define one-to-many relation with post table.
        return $this->belongsTo(Post::class);
    }
}
