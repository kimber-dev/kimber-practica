<?php

namespace App\Http\Controllers;

use App\Models\Gasto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GastoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gastos = Gasto::with('fotos')->get(); // carga también sus fotos
        return Inertia::render('gastos/index', compact('gastos'));
    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gasto = Gasto::create($request->all());
        return redirect()->route('gastos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gasto $gasto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gasto $gasto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gasto $gasto)
    {
        $gasto->update($request->all());
        return redirect()->route('gastos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Gasto = Gasto::findOrFail($id);

    // Eliminar cada foto del disco y luego de la base de datos
    foreach ($Gasto->fotos as $foto) {
        if (Storage::disk('public')->exists($foto->ruta)) {
            Storage::disk('public')->delete($foto->ruta);
        }
        $foto->delete();
    }

    // Eliminar la Gastoencia
    $Gasto->delete();

    return to_route('gastos.index')->with('success', 'Gasto y fotos eliminadas correctamente.');
    }
}