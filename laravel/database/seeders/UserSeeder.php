<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'User 1',
                'email' => 'user1@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
            ],
            [
                'name' => 'User 3',
                'email' => 'user3@gmail.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
            ],
        ]);
    }
}
