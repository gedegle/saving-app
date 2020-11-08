<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $plan_ids = Plan::pluck('id');
        $user_ids = User::pluck('id');
        return [
            'sum' => $this->faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 1000),
            'date' => now(),
            'type' => $this->faker->name,
            'plan_id' => $plan_ids->random(),
            'user_id' => $user_ids->random()
        ];
    }
}
