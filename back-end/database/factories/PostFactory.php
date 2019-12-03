<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    $plan_ids = App\Plan::pluck('id');
    $user_ids = App\User::pluck('id');
    return [
        'sum' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 1000),
        'date' => now(),
        'type' => $faker->name,
        'plan_id' => $plan_ids->random(),
        'user_id' => $user_ids->random()
    ];
});
