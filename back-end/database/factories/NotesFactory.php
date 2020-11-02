<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Notes;
use Faker\Generator as Faker;

$factory->define(App\Notes::class, function (Faker $faker) {
    $user_ids = App\User::pluck('id');
    return [
        'note' => $faker->realText(),
        'user_id' => $user_ids->random(),
    ];
});
