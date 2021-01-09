<?php

namespace App\Http\Controllers;

use App\Models\Adress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AdressResource;
use App\Models\User;

class AdressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loggedUser  = Auth::user();
        $adress      = $loggedUser->adress;
        if(!$adress) {
            return response()->json([
                'success' => false,
                'message' => 'Adresses non configurées'
            ]);
        }
        return new AdressResource($adress);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'delivery'   => 'required',
                'billing'    => 'required',
            ],
            [
                'required' => 'Le champ :attribute est requis',
            ]
        );

        $errors = $validator->errors();
        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $loggedUser  = Auth::user();
        $userId = $loggedUser->id;
        $user  = User::whereId($userId)->first();
        
        $delivery    = $validator->validated()['delivery'];
        $billing     = $validator->validated()['billing'];

        $address = Adress::create([
            "delivery" => $delivery,
            "billing"  => $billing
        ]);

        $user->adress_id = $address->id;
        $user->save();
        return response()->json([
            'success' => false,
            'message' => 'Adresses configurées avec succès'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'delivery'   => 'required',
                'billing'    => 'required',
            ],
            [
                'required' => 'Le champ :attribute est requis',
            ]
        );

        $errors = $validator->errors();
        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $loggedUser  = Auth::user();
        $loggedUserAdressId = $loggedUser->adress_id;
        $adressToUpdate  = Adress::whereId($loggedUserAdressId)->first();
        
        $delivery    = $validator->validated()['delivery'];
        $billing     = $validator->validated()['billing'];
        $adressToUpdate->billing  = $billing;
        $adressToUpdate->delivery = $delivery;
        $adressToUpdate->save();

        return response()->json([
            'success' => false,
            'message' => 'Mise à jour effectuée avec succès'
        ]);
    }

}
