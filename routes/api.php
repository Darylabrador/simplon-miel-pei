<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AdressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExploitationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShoppingcartProductsController;
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

Route::post('/login', [AuthController::class, "connection"])->name('api.connexion');
Route::post('/register', [AuthController::class, "register"])->name('api.inscription');
Route::get('/roles', [RoleController::class, "index"])->name('api.roles');

Route::middleware('auth:api')->group(function () {
    Route::get('/logout', [AuthController::class, "logout"])->name('api.logout');
    Route::get('/verify', [AuthController::class, "verifyToken"])->name('api.verify');
});

/*
|--------------------------------------------------------------------------
| Account routes
|--------------------------------------------------------------------------
*/

Route::prefix("reset")->group(function () {
    Route::post("/request", [AccountController::class, "guestForgottenPassRequest"])->name("api.reset.request");
    Route::post("/password", [AccountController::class, "resetPassword"])->name("api.reset.password");
    Route::post("/passwordAccount", [AccountController::class, "resetPassword"])->middleware('auth:api')->name("api.reset.password2");
    Route::post("/name", [AccountController::class, "editName"])->middleware('auth:api')->name("api.reset.name");
});


/*
|--------------------------------------------------------------------------
| Welcome's routes
|--------------------------------------------------------------------------
*/

Route::get('/exploitations', [ExploitationController::class, "index"])->name("api.exploitations");
Route::get('/products', [ProductsController::class, "showAll"])->name("api.products");
Route::get('/products/best', [ProductsController::class, "bestProduct"])->name("api.products.bestProduct");
Route::get('/producer/{id}', [ProductsController::class, "showProducer"])->name("api.producer.show");
Route::get('/welcome/product/{id}', [ProductsController::class, "show"])->middleware('auth:api')->name("api.product.welcome.show");

/*
|--------------------------------------------------------------------------
| Admin's routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api', 'isAdmin')->prefix('gestion')->group(function () {
    Route::get('/users', [UserController::class, "index"])->name("api.gestion.users");
    Route::post('/users', [UserController::class, "index"])->name("api.gestion.users.search");
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
    Route::post('/products/gestion', [ProductsController::class, "index"])->name("api.products.gestion.search");
    Route::get('/product/{id}', [ProductsController::class, "show"])->name("api.product.show");
    Route::post('/product/add', [ProductsController::class, "create"])->name("api.products.add");
    Route::post('/product/{id}', [ProductsController::class, "update"])->name("api.products.update");
    Route::put('/product/{id}/stock', [ProductsController::class, "stock"])->name("api.products.stock");
    Route::delete('/product/{id}', [ProductsController::class, "destroy"])->name("api.products.destroy");

    Route::get('/exploitations/owner', [ExploitationController::class, "owner"])->name("api.exploitations");
    Route::get('/exploitation/owner/{id}', [ExploitationController::class, "show"])->name("api.exploitations.show");
    Route::post('/exploitation/owner/add', [ExploitationController::class, "createUpdate"])->name("api.exploitations.createUpdate");
    Route::delete('/exploitation/owner/{id}', [ExploitationController::class, "destroy"])->name("api.exploitations.destroy");

    Route::get('/orders/producer', [OrderController::class, 'producerOrders'])->name('api.orders.producers');
    Route::get('/orders/{id}/producer', [OrderController::class, 'producerOrderDetails'])->name('api.orders.producers.show');
});

/*
|--------------------------------------------------------------------------
| Client's routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->group(function () {
    Route::get('/shoppingcart', [ShoppingcartProductsController::class, 'index'])->name('api.shoppingcart');
    Route::post('/shoppingcart/add', [ShoppingcartProductsController::class, 'addToCart'])->name('api.shoppingcart.add');
    Route::put('/shoppingcart/{id}', [ShoppingcartProductsController::class, 'updateOne'])->name('api.shoppingcart.update');
    Route::delete('/shoppingcart/{id}', [ShoppingcartProductsController::class, 'deleteOne'])->name('api.shoppingcart.deleteone');
    Route::delete('/shoppingcart', [ShoppingcartProductsController::class, 'destroy'])->name('api.shoppingcart.destroy');
    
    Route::post('/shoppingcart/confirm', [OrderController::class, 'confirmShoppingcart'])->name('api.shoppingcart.confirm');
    Route::post('/shoppingcart/direct', [OrderController::class, 'directOrder'])->name('api.shoppingcart.confirm');

    // Route::get('/orders', [OrderController::class, 'clientOrders'])->name('api.orders');
    Route::get('/orders/waiting', [OrderController::class, 'waiting'])->name('api.orders.waiting');
    Route::get('/orders/inprogress', [OrderController::class, 'inprogress'])->name('api.orders.inprogress');
    Route::get('/orders/finished', [OrderController::class, 'finished'])->name('api.orders.finished');
    Route::get('/order/{id}', [OrderController::class, 'clientOrderDetail'])->name('api.orders.show');
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
