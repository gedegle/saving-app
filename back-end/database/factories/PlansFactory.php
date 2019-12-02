<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Plan;
use Faker\Generator as Faker;

$factory->define(App\Plan::class, function (Faker $faker) {
    $user_ids = App\User::pluck('id');
    return [
        'sum' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 0, $max = 1000),
        'income' => $faker->numberBetween(100,5000),
        'user_id' => $user_ids->random(),
        'status' =>$faker->boolean,
        'if_saved' =>$faker->boolean
    ];
});
