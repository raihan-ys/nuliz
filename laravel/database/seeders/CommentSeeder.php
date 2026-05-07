<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            [
                'content' => 'This is a comment on Post 1.',
                'created_by' => 1, // Assuming the user with ID 1 is the writer
                'post_id' => 1, // Assuming the comment is on Post 1
                'created_at' => now(),
            ],
            [
                'content' => 'This is another comment on Post 1.',
                'created_by' => 2, // Assuming the user with ID 2 is the writer
                'post_id' => 1,
                'created_at' => now(),
            ],
        ]);
    }
}
