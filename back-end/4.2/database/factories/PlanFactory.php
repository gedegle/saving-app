<?php

namespace Database\Factories;

use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Plan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_ids = User::pluck('id');
        return [
            'sum' => $this->faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 1000),
            'income' => $this->faker->numberBetween(100,5000),
            'user_id' => $user_ids->random(),
            'status' =>$this->faker->boolean,
            'if_saved' =>$this->faker->boolean
        ];
    }
}
