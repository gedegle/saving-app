<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use App\Http\Resources\Post as PostResource;
use App\Http\Requests;
class PostsController extends Controller
{
    public function index()
    {
        //get post
        $posts = Post::paginate(10);

        //return collection of post as a resource

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
        $post->type = $request->input('type');
        $post->user_id = $request->input('user_id');

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
