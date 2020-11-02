<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notes;
use App\Http\Resources\Notes as NotesResource;
use App\Http\Requests;

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
        $notes = Notes::paginate(9);

        //return collection of users as a resource

        return NotesResource::collection($notes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $note = $request -> isMethod('put') ? Notes::findOrFail($request -> id) : new Notes;

        $note->id = $request->input('id');
        $note->user_id = $request->input('user_id');
        $note->note = $request->input('name');

        if($note->save()){
            return new NotesResource($note);
        }
    }

    public function update(Request $request){
        $note = Notes::findOrFail($request -> id);
        $note->note = $request->input('name');
        $note->save();
        return new NotesResource($note);
    }

 
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //get notes
        $note = Notes::findOrFail($id);

        //return single user as a resource
        return new NotesResource($note);
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
        $note = Notes::findOrFail($id);

        //return single user as a resource
        if($note->delete()){
            return new NotesResource($note);
        }

    }


}
