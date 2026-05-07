<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            [
                'title' => 'Post 1',
                'content' => 'This is the content of Post 1.',
                'created_by' => 1, // Assuming the user with ID 1 is the writer
                'created_at' => now(),
            ],
            [
                'title' => 'Post 2',
                'content' => 'This is the content of Post 2.',
                'created_by' => 1,
                'created_at' => now(),
            ],
        ]);
    }
}
