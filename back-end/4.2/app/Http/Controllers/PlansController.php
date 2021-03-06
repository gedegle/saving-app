<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use App\Http\Resources\Plan as PlanResource;


class PlansController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get post
        $plans = Plan::paginate(10);

        //return collection of post as a resource

        return New PlanResource($plans);
    }
    public function indexAll()
    {
        //get post
        $plans = Plan::paginate(100000000);

        //return collection of post as a resource

        return New PlanResource($plans);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return PlanResource
     */
    public function store(Request $request)
    {
        $plan = $request -> isMethod('put') ? Plan::findOrFail($request -> id) : new Plan;

        $plan->id = $request->input('id');
        $plan->sum = $request->input('sum');
        $plan->status = $request->input('status');
        $plan->income = $request->input('income');
        $plan->user_id = $request->input('user_id');
        $plan->if_saved = $request->input('if_saved');

        if($plan->save()){
            return ['data' => $plan];
        }

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return PostResource
     */
    public function show($id)
    {
        //get post
        $plan = Plan::findOrFail($id);

        //return single post as a resource
        return New PlanResource($plan);
    }
    public function showByUserActive($user_id)
    {
        //get post
        $plans = Plan::where('user_id', '=', $user_id)->where('status', '=', 1)->paginate(7);

        //return single post as a resource
        return New PlanResource($plans);
    }

    public function showByUserArchived($user_id)
    {
        //get post
        $plans = Plan::where('user_id', '=', $user_id)->where('status', '=', 0)->paginate(9);

        //return single post as a resource
        return New PlanResource($plans);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
       //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, $id)
    {
        $plan = Plan::findOrFail($id);

        $this->validate($request, [
            'if_saved' => 'required',
            'status' => 'required'
        ]);

        $input = $request->all();
    
        $plan->fill($input)->save();

        if($plan->save()){
            return ['data' => $plan];
        }
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
        $plan = Plan::findOrFail($id);

        //return single post as a resource
        if($plan->delete()){
            return New PlanResource($plan);
        }
    }
}
