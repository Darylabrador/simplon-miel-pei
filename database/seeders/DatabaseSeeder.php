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
            'identity'       => "admin",
            'email'          => "admin@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role_id'        => 1,
            'created_at'     => $now,
            'updated_at'     => $now
        ]);

        DB::table('users')->insert([
            'identity'       => "user sans adresse",
            'email'          => "noadresse@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'role_id'        => 1,
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
                'created_at'     => $now,
                'updated_at'     => $now
            ]);
        }


        // Add product data
        for ($i = 1; $i < 11; $i++) {
            DB::table('products')->insert([
                "name"       => "Confiture {$i}",
                "price"      => $faker->numberBetween(1, 15),
                "quantity"   => $faker->numberBetween(1, 15),
                "image"      => "default.png",
                "amountSell" => $faker->numberBetween(1, 15),
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }

        for ($i = 1; $i < 6; $i++) {
            DB::table('producers')->insert([
                "user_id"    => 4,
                "product_id" => $i,
            ]);
        }

        for ($i = 6; $i < 11; $i++) {
            DB::table('producers')->insert([
                "user_id"    => 5,
                "product_id" => $i,
            ]);
        }

        // Exploitation data
        DB::table('exploitations')->insert([
            "description"    => $faker->text(),
            "address" => $faker->address,
            "lat" => $faker->randomFloat(4, 1, 15),
            "long" => $faker->randomFloat(4, 1, 15),
            "user_id" => 4,
            'created_at' => $now,
            'updated_at' => $now
        ]);


        // Shopping cart for client
        DB::table('shoppingcarts')->insert([
            "user_id"   => 3,
        ]);

        for ($i = 1; $i < 6; $i++) {
            DB::table('shoppingcart_products')->insert([
                "quantity"          => $faker->numberBetween(1, 15),
                "shoppingcart_id"   => 1,
                "product_id"        => $i,
            ]);
        }

        // order data
        for ($i = 0; $i < 3; $i++) {
            DB::table('orders')->insert([
                "state"    => 'en attente',
                "delivery" => $faker->address,
                "billing"  => $faker->address,
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }

        for ($i = 0; $i < 3; $i++) {
            DB::table('orders')->insert([
                "state"    => 'en cours',
                "delivery" => $faker->address,
                "billing"  => $faker->address,
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }

        for ($i = 0; $i < 3; $i++) {
            DB::table('orders')->insert([
                "state"        => "termine",
                "delivery"     => $faker->address,
                "billing"      => $faker->address,
                "finished_at"  => $now,
                'created_at'   => $now,
                'updated_at'   => $now
            ]);
        }

        // user orders data 
        for ($i = 1; $i < 10; $i++) {
            DB::table('user_orders')->insert([
                'order_id' => $i,
                "user_id"  => 3,
            ]);
        }

        // order product data
        for ($i = 1; $i < 10; $i++) {
            DB::table('order_products')->insert([
                'quantity'    => $faker->numberBetween(1, 15),
                'order_id'    => $i,
                "product_id"  => 1,
            ]);

            DB::table('order_products')->insert([
                'quantity'    => $faker->numberBetween(1, 15),
                'order_id'    => $i,
                "product_id"  => 2,
            ]);

            DB::table('order_products')->insert([
                'quantity'    => $faker->numberBetween(1, 15),
                'order_id'    => $i,
                "product_id"  => 3,
            ]);

            DB::table('order_products')->insert([
                'quantity'    => $faker->numberBetween(1, 15),
                'order_id'    => $i,
                "product_id"  => 4,
            ]);
        }
    }
}
