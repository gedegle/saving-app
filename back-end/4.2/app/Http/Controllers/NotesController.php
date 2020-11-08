<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Http\Resources\Notes as NotesResource;
use App\Http\Requests;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
        //get users
        $notes = Note::where('user_id', '=', $user_id)->paginate(9);

        //return collection of users as a resource

        return New NotesResource($notes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $note = $request -> isMethod('put') ? Notes::findOrFail($request -> id) : new Note;

        $note->id = $request->input('id');
        $note->user_id = $request->input('user_id');
        $note->note = $request->input('note');
        $note->title = $request->input('title');

        if($note->save()){
            return ['data' =>$note];
        }
    }

    public function update(Request $request){
        $note = Note::findOrFail($request -> id);
        $this->validate($request, [
            'note' => 'required',
            'title' => 'required',
        ]);

        $input = $request->all();
    
        $note->fill($input)->save();

        if($note->save()){
            return ['data' => $note];
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
        //get notes
        $note = Note::findOrFail($id);

        //return single user as a resource
        return ['data' => $note];
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
        $note = Note::findOrFail($id);

        //return single user as a resource
        if($note->delete()){
            return ['data' => $note];
        }

    }


}
