<?php

use App\Http\Controllers\ClientesController;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('clientes',[ClientesController::class, 'index'])->name('clientes.index');
    Route::get('clientes/create',[ClientesController::class, 'create'])->name('clientes.create');
    // Route::post('clientes',[ClientesController::class, 'store'])->name('clientes.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';