<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AdressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExploitationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PDFcontroller;
use App\Http\Controllers\ProducerController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShoppingCartController;
use App\Http\Controllers\ShoppingcartProductsController;
use App\Http\Controllers\UserController;
use FontLib\Table\Type\name;

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
Route::post('/email/verification', [AuthController::class, "verifymail"])->name('api.verifyemail');

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
    Route::put('/user/mail/{id}', [UserController::class, "updateMail"])->name("api.gestion.user.mail");
    Route::put('/user/role/{id}', [UserController::class, "changeRole"])->name("api.gestion.user.role");
    Route::post('/user/suspend', [UserController::class, "suspend"])->name("api.gestion.user.suspend");
});


/*
|--------------------------------------------------------------------------
| Product's routes (producers can make action)
|--------------------------------------------------------------------------
*/

Route::get('/miels', [ProductsController::class, "productsList"])->name('api.product.list');

Route::middleware(['auth:api', 'isProducer'])->group(function(){
    Route::get('/products/gestion', [ProductsController::class, "index"])->name("api.products.gestion");
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
    Route::post('/order/confirm', [OrderController::class, 'producerConfirm'])->name('api.order.confirm');
});


/*
|--------------------------------------------------------------------------
| Client's routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->group(function () {
    Route::get('/shoppingcart', [ShoppingCartController::class, 'index'])->name('api.shoppingcart');
    Route::post('/shoppingcart/save', [ShoppingCartController::class, 'saveCart'])->name('api.shoppingcart.add');
    Route::put('/shoppingcart/{id}', [ShoppingCartController::class, 'updateOne'])->name('api.shoppingcart.update');
    Route::delete('/shoppingcart/{id}', [ShoppingCartController::class, 'deleteOne'])->name('api.shoppingcart.deleteone');
    Route::delete('/shoppingcart', [ShoppingCartController::class, 'destroy'])->name('api.shoppingcart.destroy');
    Route::post('/shoppingcart/confirm', [OrderController::class, 'confirmShoppingcart'])->name('api.shoppingcart.confirm');
    Route::get('/order/{id}/pdf', [PDFcontroller::class, 'generateInvoice'])->name('api.invoice.pdf');
});


/*
|--------------------------------------------------------------------------
| Commades's routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/commandes', [OrderController::class, 'listCommandes'])->name('api.commandes.liste');
});

/**
 * Producer routes
 */

 Route::get('/producteurs', [ProducerController::class, 'producersList'])->name('api.producer.list');

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
