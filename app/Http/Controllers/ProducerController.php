<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class ProducerController extends Controller
{
    /**
     * get producersList
     *
     * @return \Illuminate\Http\Response
     */
    public function producersList() {
        $producers = User::where(['role_id' => 3])->get();
        return UserResource::collection($producers);
    }
}
