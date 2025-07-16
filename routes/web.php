<?php

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\TransferController;
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
    Route::post('clientes',[ClientesController::class, 'store'])->name('clientes.store');
    Route::delete('/clientes/{id}', [ClientesController::class, 'destroy'])->name('clientes.destroy');

    Route::get('transfers',[TransferController::class, 'index'])->name('transfers.index');
    Route::delete('/tranfers/{id}', [TransferController::class, 'destroy'])->name('transfers.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';