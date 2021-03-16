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

        // Add roles data
        $rolesArray = ['admin', 'client', 'producteur'];
        for ($i = 0; $i < count($rolesArray); $i++) {
            DB::table('roles')->insert([
                'label' => $rolesArray[$i]
            ]);
        }

        // Add Users data
        DB::table('users')->insert([
            'identity'       => "admin admin",
            'email'          => "admin@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 1,
            'verified_at'    => $now,
            'created_at'     => $now,
            'updated_at'     => $now
        ]);


        DB::table('users')->insert([
            'identity'       => "DOE John",
            'email'          => "client@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 2,
            'verified_at'    => $now,
            'created_at'     => $now,
            'updated_at'     => $now
        ]);

        DB::table('users')->insert([
            'identity'       => "Payet Claude",
            'email'          => "producteur@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
            'created_at'     => $now,
            'updated_at'     => $now
        ]);

        for($i = 0; $i < 5; $i++){
            DB::table('users')->insert([
                'identity'       => $faker->name,
                'email'          => $faker->unique()->safeEmail,
                'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'confirmToken' => Str::random(10),
                'role_id'        => 2,
                'verified_at'    => $now,
                'created_at'     => $now,
                'updated_at'     => $now
            ]);
        }

        // Add product data
        for ($i = 1; $i < 11; $i++) {
            DB::table('products')->insert([
                "name"       => "Miel péi {$i}",
                "price"      => $faker->numberBetween(1, 15),
                "quantity"   => $faker->numberBetween(1, 15),
                "image"      => "default.jpg",
                "amountSell" => $faker->numberBetween(1, 15),
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }

        for ($i = 1; $i < 6; $i++) {
            DB::table('producers')->insert([
                "user_id"    => 3,
                "product_id" => $i,
            ]);
        }

        DB::table('exploitations')->insert([
            "description" => "Miel péi original",
            "address" => "45 Rue Auguste Babet 97410 Saint-Pierre",
            "lat" => "-21.336042",
            "long" => "55.480444",
            "user_id"    => 3,
        ]);


        DB::table('shoppingcarts')->insert([
            "user_id"    => 2,
        ]);

        for ($i = 1; $i < 6; $i++) {
            DB::table('shoppingcart_products')->insert([
                "quantity"          => $faker->numberBetween(1, 15),
                "shoppingcart_id"   => 1,
                "product_id"        => $i,
            ]);
        }
    }
}
