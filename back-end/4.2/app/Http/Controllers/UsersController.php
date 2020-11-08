<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User as UserResource;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Session\Middleware\StartSession;
use \Illuminate\View\Middleware\ShareErrorsFromSession;
use DB;
use Cookie;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get users
        $users = User::paginate(10);

        //return collection of users as a resource

        return new UserResource($users);
    }
    
    public function indexAll()
    {
        //get users
        $users = User::paginate(100000000);

        //return collection of users as a resource

        return New UserResource($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request -> isMethod('put') ? User::findOrFail($request -> id) : new User;

        $user->id = $request->input('id');
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));

        if($user->save()){
            return new UserResource($user);
        }
    }

    public function update(Request $request){
        $user = User::findOrFail($request -> id);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->save();
        return ['data' => $user];
    }

    public function updatePassword(Request $request){
        $user = User::findOrFail($request -> id);
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //get user
        $user = User::findOrFail($id);

        //return single user as a resource
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //destroy user
        $user = User::findOrFail($id);

        //return single user as a resource
        if($user->delete()){
            return new UserResource($user);
        }

    }

    public $user;

    public function __construct() {
        $this->middleware(function ($request, $next) {
           $this->user= Auth::user();
           if (!is_null($this->user) || !empty($this->user)) {
                $user_id = $this->user->id;
                $count = DB::table('plans')->where('user_id', '=', $user_id)->where('status', '=', 1)->count();
                $this->user->setAttribute('planCount', $count);
           }

           return $next($request);
        });
    }

    public function user(Request $request)
    {
       return new UserResource($this->user);
    }
}
