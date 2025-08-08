<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // $transfers = Transfer::all();
        $transfers = Transfer::with('fotos')->get(); // carga también sus fotos
        return Inertia::render('transfers/index', compact('transfers'));
    
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
        //
        $tranferencia = Transfer::create([
            'remitente' => $request->remitente,
            'destinatario' => $request->destinatario,
            'fecha' => $request->fecha,
            'agente' => $request->agente,
            'monto' => $request->monto,
            'estado' => $request->estado,
            'cuenta' => $request->cuenta,
            'observacion' => $request->observacion,
        ]);
        return redirect()->route('transfers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transfer $transfers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transfer $transfers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transfer $transfer)
    {
        $validated = $request->validate([
        'remitente' => 'required|string|max:255',
        'destinatario' => 'required|string|max:255',
        'fecha' => 'required|date',
        'agente' => 'nullable|string|max:255',
        'monto' => 'required|numeric|min:0',
        'estado' => 'required|string|in:pendiente,completado,cancelado',
            'cuenta' => 'required|string|max:255|in:Interbank,BCP',
        'observacion' => 'nullable|string|max:1000',
    ]);

    $transfer->update($validated);

    return redirect()->back()->with('success', 'Transferencia actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    

public function destroy(string $id)
{
    $transfer = Transfer::findOrFail($id);

    // Eliminar cada foto del disco y luego de la base de datos
    foreach ($transfer->fotos as $foto) {
        if (Storage::disk('public')->exists($foto->ruta)) {
            Storage::disk('public')->delete($foto->ruta);
        }
        $foto->delete();
    }

    // Eliminar la transferencia
    $transfer->delete();

    return to_route('transfers.index')->with('success', 'Transferencia y fotos eliminadas correctamente.');
}

}