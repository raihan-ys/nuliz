<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'content',
        'created_by'
    ];

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        // Define one to many relation with users table.
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get comments for the post.
     */
    public function comments()
    {
        // Define one to many relation with comments table.
        return $this->hasMany(Comment::class, 'post_id');
    }
}
