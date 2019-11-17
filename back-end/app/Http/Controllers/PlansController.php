<?php

namespace App\Http\Controllers;

use App\Plan;
use Illuminate\Http\Request;
use App\Http\Resources\Plan as PlanResource;
use App\Http\Requests;

class PlansController extends Controller
{
    public function index()
    {
        //get plans
        $plans = Plan::paginate(10);

        //return collection of plans as a resource

        return PlanResource::collection($plans);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $plan = $request -> isMethod('put') ? Plan::findOrFail($request -> id) : new Plan;

        $plan->id = $request->input('id');
        $plan->sum = $request->input('sum');
        $plan->dateTill = $request->input('dateTill');
        $plan->user_id = $request->input('user_id');

        if($plan->save()){
            return new PlanResource($plan);
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
        //get plan
        $plan = Plan::findOrFail($id);

        //return single plan as a resource
        return new PlanResource($plan);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //destroy plan
        $plan = Plan::findOrFail($id);

        //return single plan as a resource
        if($plan->delete()){
            return new PlanResource($plan);
        }

    }

}
