<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExploitationController;
use App\Http\Controllers\ProductsController;
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
| Login's routes
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
| Admin's routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api', 'isAdmin')->prefix('gestion')->group(function () {
    Route::get('/users', [UserController::class, "index"])->name("api.gestion.users");
    Route::put('/user/mail/{id}', [UserController::class, "updateMail"])->name("api.gestion.user.mail");
    Route::put('/user/role/{id}', [UserController::class, "changeRole"])->name("api.gestion.user.role");
    Route::post('/user/suspend', [UserController::class, "suspend"])->name("api.gestion.user.suspend");
});


/*
|--------------------------------------------------------------------------
| Product's routes (producers can make action)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:api', 'isProducer'])->group(function(){
    Route::get('/products/gestion', [ProductsController::class, "index"])->name("api.products.gestion");
    Route::get('/product/{id}', [ProductsController::class, "show"])->name("api.product.show");
    Route::post('/product/add', [ProductsController::class, "create"])->name("api.products.add");
    Route::put('/product/{id}', [ProductsController::class, "update"])->name("api.products.update");
    Route::put('/product/{id}/stock', [ProductsController::class, "stock"])->name("api.products.stock");
    Route::delete('/product/{id}', [ProductsController::class, "destroy"])->name("api.products.destroy");

    Route::get('/exploitations/owner', [ExploitationController::class, "owner"])->name("api.exploitations");
    Route::get('/exploitation/owner/{id}', [ExploitationController::class, "show"])->name("api.exploitations.show");
    Route::post('/exploitation/owner/add', [ExploitationController::class, "create"])->name("api.exploitations.create");
    Route::put('/exploitation/owner/{id}', [ExploitationController::class, "update"])->name("api.exploitations.update");
    Route::delete('/exploitation/owner/{id}', [ExploitationController::class, "destroy"])->name("api.exploitations.destroy");
});

/*
|--------------------------------------------------------------------------
| Client's routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->group(function () {
    Route::get('/products', [ProductsController::class, "showAll"])->name("api.products");
    Route::get('/products/best', [ProductsController::class, "bestProduct"])->name("api.products.bestProduct");
    Route::get('/producer/{id}', [ProductsController::class, "showProducer"])->name("api.producer.show");
    Route::get('/exploitations', [ExploitationController::class, "index"])->name("api.exploitations");
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
