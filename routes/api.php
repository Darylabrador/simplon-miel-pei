<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

/*
|--------------------------------------------------------------------------
| Login routes
|--------------------------------------------------------------------------
*/

Route::post('/connexion', [AuthController::class, "connection"])->name('api.connexion');
Route::post('/inscription', [AuthController::class, "register"])->name('api.inscription');

Route::middleware('auth:api')->group(function () {
    Route::get('/logout', [AuthController::class, "logout"])->name('api.logout');
    Route::get('/verify', [AuthController::class, "verifyToken"])->name('api.verify');
});


/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->prefix('gestion')->group(function () {
    Route::get('/users', [UserController::class, "index"])->name("api.gestion.users");
    Route::put('/user/mail/{id}', [UserController::class, "updateMail"])->name("api.gestion.user.mail");
    Route::put('/user/role/{id}', [UserController::class, "changeRole"])->name("api.gestion.user.role");
    Route::post('/user/suspend', [UserController::class, "suspend"])->name("api.gestion.user.suspend");
});

/*
|--------------------------------------------------------------------------
| Default route if no one found
|--------------------------------------------------------------------------
*/

Route::fallback(function () {
    return response()->json([
        "message" => "Cette route n'existe pas"
    ], 404);
});
