<?php

namespace App\Http\Controllers;

use App\Jobs\ResetTentatives;
use App\Mail\LoginNotification;
use App\Mail\NotificationLockedAccount;
use App\Mail\NotificationUnlockedAccount;
use App\Mail\VerifyEmail;
use App\Models\Shoppingcart;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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

        if (!$userExist) {
            return response()->json([
                'success' => false,
                'message' => "Adresse email ou mot de passe incorrecte"
            ]);
        }

        if ($userExist->verified_at == null) {
            return response()->json([
                'success' => false,
                'message' => "Vous devez confirmer votre adresse email"
            ]);
        }

        if ($userExist->suspended == 1) {
            return response()->json([
                'success' => false,
                'message' => "Compte temporairement suspendu"
            ]);
        }

        $oldTentative = $userExist->tentatives;

        switch ($oldTentative) {
            case 3:
                $userExist->tentatives = 4;
                $userExist->save();

                Mail::to($userExist->email)->later(now()->addMinutes(30), new NotificationUnlockedAccount());
                $resetJob = (new ResetTentatives($userExist->id, $userExist->email))->delay(Carbon::now()->addMinutes(30));
                dispatch($resetJob);

                $ip  = $_SERVER['REMOTE_ADDR'];
                openlog('TEMAAS_AUTH', LOG_NDELAY, LOG_USER);
                syslog(LOG_INFO, "L'utilisateur {$userExist->email} à atteint son nombre maximal de tentative de connexion depuis l'adresse IP {$ip} ! ");
                Mail::to($userExist->email)->send(new NotificationLockedAccount());

                return response()->json([
                    'success' => false,
                    'message' => "Veuillez réessayer dans 30 minutes",
                ]);
                break;
            case 4:
                return response()->json([
                    'success' => false,
                    'message' => "Veuillez réessayer dans quelques minutes",
                ]);
                break;
            default:
                if (Hash::check($password, $userExist->password)) {
                    $userExist->tentatives = 0;
                    $userExist->save();
                    
                    // information about connection (security notification mail)
                    $ip  = $_SERVER['REMOTE_ADDR'];
                    $now = now()->toDateString();
                    $datenow = new DateTime($now);
                    $datenowFormat = $datenow->format('d-m-Y');
                    
                    Mail::to($userExist->email)->send(new LoginNotification($userExist->identity, $ip, $datenowFormat));
                    $token = $userExist->createToken('AuthToken')->accessToken;
            
                    return response()->json([
                        "success" => true,
                        "message" => "Vous êtes connecté !",
                        "token"   => $token,
                        "role"    => $userExist->role_id
                    ]);
                } else {
                    $tentative    = $userExist->tentatives + 1;
                    $userExist->tentatives = $tentative;
                    $userExist->save();
                    return response()->json([
                        'success' => false,
                        'message' => "Adresse email ou mot de passe incorrecte",
                    ]);
                }
                break;
            }       
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
                'role'            => 'required',
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
        $role              = $validator->validated()['role'];
        $password          = $validator->validated()['password'];
        $passwordConfirm   = $validator->validated()['passwordConfirm'];

        if ($password != $passwordConfirm) {
            return response()->json([
                "success" => false,
                "message" => "Les mots de passe ne sont pas identique"
            ]);
        }

        $confirmToken = Str::random(20);
        $user = new User();
        $user->identity = $identity;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->role_id = $role;
        $user->confirmToken = $confirmToken;
        $user->save();

        if($role == 2) {
            Shoppingcart::create([
                "confirmed" => false,
                "user_id"   => $user->id,
            ]);
        }

        $url = request()->getSchemeAndHttpHost() . "/email/verification/" . $confirmToken;
        Mail::to($user->email)->send(new VerifyEmail($user->identity, $url));

        return response()->json([
            "success" => true,
            "message" => "Vous devez à présent confirmer votre adresse e-mail"
        ]);
    }


    /**
     * Verify mail
     *
     *  @return \Illuminate\Http\Response
     */
    public function verifymail(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'confirmToken' => 'required',
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

        $confirmToken  = $validator->validated()['confirmToken'];
        $userExist = User::where(['confirmToken' => $confirmToken])->first();

        if (!$userExist) {
            return response()->json([
                "success" => false,
                "message" => "Jeton de vérification invalide"
            ]);
        }

        if ($userExist->verified_at != null) {
            return response()->json([
                "success" => false,
                "message" => "Adresse e-mail déjà vérifier"
            ]);
        }

        $userExist->verified_at =  now();
        $userExist->save();

        return response()->json([
            "success" => true,
            "message" => "Adresse email vérifier avec succès"
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
