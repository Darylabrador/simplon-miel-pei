<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $now = now()->toDateString();
        $faker = \Faker\Factory::create("fr_FR");

        $rolesArray = ['admin', 'client', 'producteur'];
        for ($i = 0; $i < count($rolesArray); $i++) {
            DB::table('roles')->insert([
                'label' => $rolesArray[$i]
            ]);
        }

        \App\Models\Adress::factory(5)->create();

        DB::table('users')->insert([
            'identity'       => "admin",
            'email'          => "admin@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role_id'        => 1,
            'adress_id'      => 1,
            'created_at'     => $now,
            'updated_at'     => $now
        ]);

        for($i = 2; $i < 4; $i++){
            DB::table('users')->insert([
                'identity'       => $faker->name,
                'email'          => $faker->unique()->safeEmail,
                'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'role_id'        => 2,
                'adress_id'      => $i,
                'created_at'     => $now,
                'updated_at'     => $now
            ]);
        }

        for ($i = 4; $i < 6; $i++) {
            DB::table('users')->insert([
                'identity'       => $faker->name,
                'email'          => $faker->unique()->safeEmail,
                'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'role_id'        => 3,
                'adress_id'      => $i,
                'created_at'     => $now,
                'updated_at'     => $now
            ]);
        }
    }
}
