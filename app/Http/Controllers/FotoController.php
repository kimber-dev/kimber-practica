<?php

namespace App\Http\Controllers;

use App\Models\Foto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
// public function store(Request $request, $transferId)
// {
//     $request->validate([
//         'ruta' => 'required|array',
//         'ruta.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
//         'descripcion' => 'nullable|string|max:255',
//     ]);

//     $fotos = [];

//     foreach ($request->file('ruta') as $file) {
//         $path = $file->store('transfers', 'public');

//         $foto = Foto::create([
//             'transfer_id' => $transferId,
//             'ruta' => $path,
//             'descripcion' => $request->descripcion,
//         ]);

//         $fotos[] = $foto->fresh(); // Asegura que trae todos los datos
//     }

//     // Intentar múltiples formas de pasar los datos
//         return redirect()->back()->with([
//             'flash' => ['nuevasFotos' => $fotos],
//             'nuevasFotos' => $fotos,
//             'success' => 'Fotos subidas correctamente'
//         ]);
// }
public function store(Request $request, $tipo, $id)
{
    $request->validate([
        'ruta' => 'required|array',
        'ruta.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        'descripcion' => 'nullable|string|max:255',
    ]);

    $modelClass = match($tipo) {
        'transfer' => \App\Models\Transfer::class,
        'gasto' => \App\Models\Gasto::class,
        default => abort(404),
    };

    $modelo = $modelClass::findOrFail($id);
    $fotos = [];

    foreach ($request->file('ruta') as $file) {
        $path = $file->store($tipo . 's', 'public');

        $foto = $modelo->fotos()->create([
            'ruta' => $path,
            'descripcion' => $request->descripcion,
        ]);

        $fotos[] = $foto->fresh();
    }

    return redirect()->back()->with([
        'nuevasFotos' => $fotos,
        'success' => 'Fotos subidas correctamente',
    ]);
}



    /**
     * Display the specified resource.
     */
    public function show(Foto $foto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Foto $foto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Foto $foto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Foto $foto)
{
    // Eliminar la imagen del disco
    Storage::disk('public')->delete($foto->ruta);

    // Eliminar de la base de datos
    $foto->delete();

    return back()->with('success', 'Foto eliminada correctamente.');
}
}