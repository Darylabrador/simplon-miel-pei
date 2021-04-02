<?php

namespace Database\Seeders;

use App\Models\Exploitation;
use App\Models\Products;
use App\Models\Shoppingcart;
use App\Models\User;
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
        $admin = User::create([
            'identity'       => "admin admin",
            'email'          => "admin@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 1,
            'verified_at'    => $now,
        ]);

        $client = User::create([
            'identity'       => "DOE John",
            'email'          => "client@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 2,
            'verified_at'    => $now,
        ]);


        $producteur = User::create([
            'identity'       => $faker->name,
            'email'          => "producteur@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
        ]);


        $producteur2 = User::create([
            'identity'       => $faker->name,
            'email'          => "producteur2@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
        ]);

        $producteur3 = User::create([
            'identity'       => $faker->name,
            'email'          => "producteur3@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
        ]);


        $producteur4 = User::create([
            'identity'       => $faker->name,
            'email'          => "producteur4@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
        ]);


        $producteur5 = User::create([
            'identity'       => $faker->name,
            'email'          => "producteur5@gmail.com",
            'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'confirmToken' => Str::random(10),
            'role_id'        => 3,
            'verified_at'    => $now,
        ]);


        // Add product data
        $imageProd = ['miel.jpg', 'miel_soupe.jpg', 'miel_rose.jpg', 'miel_recolte.jpg', 'miel_orange.jpg', 'miel_fleur.jpg', 'miel_concentre.jpg', 'miel_citron.jpg', 'miel_champ.jpg', 'miel_cannel.jpg'];
        $imageName = ['miel', 'miel soupe', 'miel rose', 'miel recolte', "miel d'orange", 'miel de fleur', 'miel concentré', 'miel de citron', 'miel des champs', 'miel de cannel'];

        for ($i = 0; $i < count($imageProd); $i++) {
            Products::create([
                "name"       => ucfirst($imageName[$i]),
                "price"      => $faker->numberBetween(1, 15),
                "quantity"   => $faker->numberBetween(1, 15),
                "image"      => $imageProd[$i],
                "amountSell" => $faker->numberBetween(1, 15),
                "user_id"    => $faker->numberBetween(3, 7)
            ]);
        }

        for($i = 0; $i < 5; $i++){
            User::create([
                'identity'       => $faker->name,
                'email'          => $faker->unique()->safeEmail,
                'password'       => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'confirmToken' => Str::random(10),
                'role_id'        => 2,
                'verified_at'    => $now,
            ]);
        }

        // create exploitation
        Exploitation::create([
            "description" => "Miel péi original",
            "address" => "45 Rue Auguste Babet 97410 Saint-Pierre",
            "lat" => "-21.336042",
            "long" => "55.480444",
            "user_id"    => $producteur->id,
        ]);

        Exploitation::create([
            "description" => "Saveur avant tout",
            "address" => "25 a Chemin des Kakis 97450 Saint-Louis",
            "lat" => "-21.253652",
            "long" => "55.431456",
            "user_id"    => $producteur2->id,
        ]);

        Exploitation::create([
            "description" => "Miel des hauts",
            "address" => "25 Chemin Mace 97411 Saint-Paul",
            "lat" => "-21.002912",
            "long" => "55.321337",
            "user_id"    => $producteur3->id,
        ]);


        Exploitation::create([
            "description" => "Douceur et saveur sont de paires",
            "address" => "25 Chemin Lagourgue 97440 Saint-André",
            "lat" => "-20.957779",
            "long" => "55.650622",
            "user_id"    => $producteur4->id,
        ]);

        Exploitation::create([
            "description" => "Tout pour vous",
            "address" => "15 Avenue du Général de Gaulle 97425 Les Avirons",
            "lat" => "-21.236097",
            "long" => "55.330396",
            "user_id"    => $producteur5->id,
        ]);

        // adding product to shoppingcart
        for ($i = 0; $i < count($imageProd); $i++) {
            $index = $i + 1;
            Shoppingcart::create([
                "quantity"     => $faker->numberBetween(1, 15),
                "user_id"      => $client->id,
                "product_id"   => $index,
            ]);
        }
    }
}
