<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;
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
Route::group(['middleware' => ['web']], function () {
    // your routes here

//List users
Route::get('users',[UsersController::class,'index']);
Route::get('users-all',[UsersController::class,'indexAll']);

//List single user
Route::get('user/{id}',[UsersController::class,'show']);

//create new user
Route::post('user',[UsersController::class,'store']);

//update user
Route::put('user',[UsersController::class,'store']);

//delete user
Route::delete('user/{id}',[UsersController::class,'destroy']);

Route::put('user/update', [UsersController::class,'update']);
Route::put('user/update-pass', [UsersController::class,'updatePassword']);


//List plans
Route::get('plans',[PlansController::class,'index']);
Route::get('plans-all',[PlansController::class,'indexAll']);

//List user plan
Route::get('user-plans/active/{user_id}',[PlansController::class,'showByUserActive']);
Route::get('user-plans/archived/{user_id}',[PlansController::class,'showByUserArchived']);
//List signle plan
Route::get('plan/{id}',[PlansController::class,'show']);

//create new plan
Route::post('plan',[PlansController::class,'store']);
//update plan
Route::put('plan/{id}',[PlansController::class,'update']);


//List notes
Route::get('notes',[PlansController::class,'NotesController@index']);
//create new note
Route::post('note',[PlansController::class,'NotesController@store']);
//update note
Route::put('note',[PlansController::class,'NotesController@update']);
//List signle note
Route::get('note/{id}',[PlansController::class,'NotesController@show']);
//delete note
Route::delete('note/{id}',[PlansController::class,'NotesController@destroy']);


//List posts
Route::get('posts',[PostsController::class, 'index']);
Route::get('posts-all',[PostsController::class,'indexAll']);
Route::get('posts/{plan_id}',[PostsController::class,'indexByPlan']);
Route::get('posts/{plan_id}/{date}',[PostsController::class,'filterByDate']);

//List single post
Route::get('post/{id}',[PostsController::class,'show']);

//create new post
Route::post('post',[PostsController::class,'store']);

//update post
Route::put('post/{id}',[PostsController::class,'update']);

//delete post
Route::delete('post/{id}',[PostsController::class,'destroy']);

//all post by post id
Route::get('posts-by-plan/{planId}',[PostsController::class,'showAllByPlan']);

});
/**
 * Login Route(s)
 */

Route::group([

    'middleware' => ['jwt.auth', 'cors:api'],
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('logout', [AuthController::class,'logout'])->name('logout');
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me'])->name('me');

});