<?php

namespace Database\Factories;

use App\Models\Adress;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Adress::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "delivery" => $this->faker->address,
            "billing"  => $this->faker->address
        ];
    }
}
