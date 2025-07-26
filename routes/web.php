<?php

use App\Http\Controllers\ClientesController;
use App\Http\Controllers\FotoController;
use App\Http\Controllers\GastoController;
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
    Route::post('transfers',[TransferController::class, 'store'])->name('transfers.store');
    Route::post('transfers/{transfer}', [TransferController::class, 'update'])->name('transfers.update');
    Route::delete('/tranfers/{id}', [TransferController::class, 'destroy'])->name('transfers.destroy');

    // Route::post('transfers/{transfer}/fotos', [FotoController::class, 'store'])
    // ->name('transfers.fotos.store');
    Route::post('{tipo}/{id}/fotos', [FotoController::class, 'store'])
    ->name('fotos.store');

Route::get('gastos',[GastoController::class, 'index'])->name('gastos.index');
Route::post('gastos',[GastoController::class, 'store'])->name('gastos.store');
    Route::post('gastos/{gasto}', [GastoController::class, 'update'])->name('gastos.update');
    Route::delete('/gastos/{id}', [GastoController::class, 'destroy'])->name('gastos.destroy');

Route::delete('/fotos/{foto}', [FotoController::class, 'destroy'])->name('fotos.destroy');//esto es para





});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';