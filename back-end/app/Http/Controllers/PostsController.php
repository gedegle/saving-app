<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function index()
    {
        //get post
        $posts = Post::paginate(10);

        //return collection of post as a resource

        return PostResource::collection($posts);
    }
    public function indexAll()
    {
        //get post
        $posts = Post::get();

        //return collection of post as a resource

        return PostResource::collection($posts);
    }

    public function indexByPlan($plan_id) {
        $posts = Post::where('plan_id', '=', $plan_id)->orderBy('updated_at', 'DESC')->paginate(7);;

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = $request -> isMethod('put') ? Post::findOrFail($request -> id) : new Post;

        $post->id = $request->input('id');
        $post->sum = $request->input('sum');
        $post->date = $request->input('date');
        $post->type = $request->input('type');
        $post->user_id = $request->input('user_id');
        $post->plan_id = $request->input('plan_id');

        if($post->save()){
            return new PostResource($post);
        }
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $this->validate($request, [
            'sum' => 'required',
            'date' => 'required',
            'type' => 'required',
        ]);

        $input = $request->all();
    
        $post->fill($input)->save();

        if($post->save()){
            return new PostResource($post);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //get post
        $post = Post::findOrFail($id);

        //return single post as a resource
        return new PostResource($post);
    }

     /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showAllByPlan($planId, $userId)
    {
       //get post
       $posts = Post::where('plan_id', '=', $planId)->where('user_id', '=', $userId)->get();
       //return collection of post as a resource

       return PostResource::collection($posts);
    }

    public function filterByDate($planId, $date)
    {
       //get post
       $posts = Post::where('plan_id', '=', $planId)->where('date', '=', $date)->paginate(7);
       //return collection of post as a resource

       return PostResource::collection($posts);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //destroy post
        $post = Post::findOrFail($id);

        //return single post as a resource
        if($post->delete()){
            return new PostResource($post);
        }

    }
}
