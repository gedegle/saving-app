<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//List users
Route::get('users','UsersController@index');
Route::get('users-all','UsersController@indexAll');

//List single user
Route::get('user/{id}','UsersController@show');

//create new user
Route::post('user','UsersController@store');

//update user
Route::put('user','UsersController@store');

//delete user
Route::delete('user/{id}','UsersController@destroy');

Route::put('user/update', 'UsersController@update');
Route::put('user/update-pass', 'UsersController@updatePassword');


//List plans
Route::get('plans','PlansController@index');
Route::get('plans-all','PlansController@indexAll');

//List single plan
Route::get('plan/{user_id}','PlansController@showByUser');

//create new plan
Route::post('plan','PlansController@store');
//update plan
Route::put('plan/{id}','PlansController@update');


//List posts
Route::get('posts','PostsController@index');
Route::get('posts-all','PostsController@indexAll');

//List single post
Route::get('post/{id}','PostsController@show');

//create new post
Route::post('post','PostsController@store');

//update post
Route::put('post','PostsController@store');

//delete post
Route::delete('post/{id}','PostsController@destroy');


/**
 * Login Route(s)
 */
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
/**
 * Register Route(s)
 */
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('register', 'Auth\RegisterController@register');
/**
 * Password Reset Route(S)
 */
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
/**
 * Email Verification Route(s)
 */
Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
Route::get('email/verify/{id}', 'Auth\VerificationController@verify')->name('verification.verify');
Route::get('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');
