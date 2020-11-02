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

//List user plan
Route::get('user-plans/active/{user_id}','PlansController@showByUserActive');
Route::get('user-plans/archived/{user_id}','PlansController@showByUserArchived');
//List signle plan
Route::get('plan/{id}','PlansController@show');

//create new plan
Route::post('plan','PlansController@store');
//update plan
Route::put('plan/{id}','PlansController@update');


//List notes
Route::get('notes','NotesController@index');
//create new note
Route::post('note','NotesController@store');
//update note
Route::put('note','NotesController@update');
//List signle note
Route::get('note/{id}','NotesController@show');
//delete note
Route::delete('note/{id}','NotesController@destroy');


//List posts
Route::get('posts','PostsController@index');
Route::get('posts-all','PostsController@indexAll');
Route::get('posts/{plan_id}','PostsController@indexByPlan');
Route::get('posts/{plan_id}/{date}','PostsController@filterByDate');

//List single post
Route::get('post/{id}','PostsController@show');

//create new post
Route::post('post','PostsController@store');

//update post
Route::put('post/{id}','PostsController@update');

//delete post
Route::delete('post/{id}','PostsController@destroy');

//all post by post id
Route::get('posts-by-plan/{planId}/{userId}','PostsController@showAllByPlan');


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
