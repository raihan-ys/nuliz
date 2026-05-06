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
        // Define one-to-many relation with users table.
        return $this->belongsTo(User::class);
    }
}
