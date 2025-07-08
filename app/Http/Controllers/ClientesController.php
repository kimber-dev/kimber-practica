<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //muestra el indice
        return Inertia::render('clientes/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('clientes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request);
        // $request->validate([
        //     'nombre' => 'required|string|max:60',
        //     'apellido' => 'required|string|max:100',
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.Cliente::class,
        //     'telefono' => 'required|string|numeric|max:11',
        // ]);

        // $cliente = Cliente::create([
        //     'nombre' => $request->name,
        //     'apellido' => $request->apellido,
        //     'email' => $request->email,
        //     'telefono' => $request->telefono,
        // ]);

        // event(new Registered($cliente));


        // return redirect()->intended(route('clientes.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}