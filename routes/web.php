<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('accueil');


/*
|--------------------------------------------------------------------------
| Login Routes
|--------------------------------------------------------------------------
*/

Route::get('/connexion', function () {
    return view('login');
})->name('connexion');


Route::get('/inscription', function () {
    return view('register');
})->name('inscription');

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Producer Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard/fiche', function () {
    return view('producer.fiche');
})->name('producer.fiche');

Route::get('/dashboard/stock', function () {
    return view('producer.stock');
})->name('producer.stock');

Route::get('/dashboard/commandes', function () {
    return view('producer.order');
})->name('producer.order');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function(){
    return view('dashboard');
})->name('dashboard');


Route::get('/dashboard/utilisateurs', function() {
    return view('admin.users');
})->name('admin.users');


/*
|--------------------------------------------------------------------------
| Profils Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard/profil', function () {
    return view('profils.index');
})->name('profil');


/*
|--------------------------------------------------------------------------
| Account setting's routes
|--------------------------------------------------------------------------
*/

Route::get('/reinitialisation/{resetToken?}', function ($resetToken = null) {
    if ($resetToken) {
        return view('reset', compact("resetToken"));
    } else {
        return view('reset');
    }
})->name('resetpassword');


/*
|--------------------------------------------------------------------------
| Default route if no one found
|--------------------------------------------------------------------------
*/

Route::fallback(function () {
    return redirect()->route('accueil');
});