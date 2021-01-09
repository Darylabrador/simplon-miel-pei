<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where("role_id", "NOT LIKE", "1")->get();
        return UserResource::collection($users);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateMail(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required',
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

        $email = $validator->validated()['email'];
        $user  = User::whereId($id)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Utilisateur introuvable"
            ]);
        }

        $user->email = $email;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Mise à jour effectuée"
        ]);
    }


    /**
     * Change user's role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function changeRole(Request $request, $id) {
        $validator = Validator::make(
            $request->all(),
            [
                'roleId'    => 'required',
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

        $role = $validator->validated()['roleId'];
        $user  = User::whereId($id)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Utilisateur introuvable"
            ]);
        }

        $user->role_id = $role;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Mise à jour effectuée"
        ]);
    }


    /**
     * Suspend user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function suspend(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'userId'    => 'required',
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

        $userId = $validator->validated()['userId'];
        $user  = User::whereId($userId)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Utilisateur introuvable"
            ]);
        }

        $user->suspended = 1;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Suspension effectuée avec succès"
        ]);
    }
}
