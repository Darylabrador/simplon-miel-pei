<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Handle user connection.
     *
     * @return \Illuminate\Http\Response
     */
    public function connection(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email'    => 'required',
                'password' => 'required',
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

        $email      = $validator->validated()['email'];
        $password   = $validator->validated()['password'];
        $userExist  = User::where(["email" => $email])->first();

        if (!$userExist || !Hash::check($password, $userExist->password)) {
            return response()->json([
                'success' => false,
                'message' => "Adresse email ou mot de passe incorrecte"
            ]);
        }

        if($userExist->suspended == 1) {
            return response()->json([
                'success' => false,
                'message' => "Compte temporairement suspendu"
            ]);
        }

        $token = $userExist->createToken('AuthToken')->accessToken;

        return response()->json([
            "success" => true,
            "message" => "Vous êtes connecté !",
            "token"   => $token
        ]);        
    }


    /**
     * Handle create user's account.
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'identity'        => 'required',
                'email'           => 'required|unique:users',
                'password'        => 'required',
                'passwordConfirm' => 'required',
            ],
            [
                'required' => 'Le champ :attribute est requis',
                'unique'   => 'Adresse email existe déjà'
            ]
        );

        $errors = $validator->errors();

        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $identity          = $validator->validated()['identity'];
        $email             = $validator->validated()['email'];
        $password          = $validator->validated()['password'];
        $passwordConfirm   = $validator->validated()['passwordConfirm'];

        if ($password != $passwordConfirm) {
            return response()->json([
                "success" => false,
                "message" => "Les mots de passe ne sont pas identique"
            ]);
        }

        $user = new User();
        $user->identity = $identity;
        $user->email    = $email;
        $user->password = Hash::make($password);
        $user->role_id  = 2;
        $user->remember_token = Str::random(10);
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Inscription réussie"
        ]);
    }


    /**
     * Handle disconnect request.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json([
            'success' => true,
            "message" => "Vous êtes déconnecté !",
        ]);
    }


    /**
     * Check token validity
     *
     * @return \Illuminate\Http\Response
     */
    public function verifyToken()
    {
        $loggedUser   = Auth::user();
        return response()->json(['data' => $loggedUser]);
    }
}
