<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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
