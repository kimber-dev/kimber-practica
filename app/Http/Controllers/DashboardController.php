<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Transfer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'totalGastos' => Gasto::sum('monto'),
            'totalTransferencias' => Transfer::sum('monto'),
            'transferBcp' => Transfer::where('cuenta', '=', 'BCP')->sum('monto'),
            'transferInterbank' => Transfer::where('cuenta', '=', 'Interbank')->sum('monto'),
            'gastosPorTipo' => Gasto::select('tipo', DB::raw('SUM(monto) as total'))
            ->groupBy('tipo')
            ->get()
            ->map(function ($gasto) {
                $gasto->total = (float) $gasto->total;
                return $gasto;
            }),
            'saldoActual' => Transfer::sum('monto') - Gasto::sum('monto'),
            'gastosPorMesYTipo' => Gasto::selectRaw("DATE_FORMAT(fecha, '%Y-%m') as mes, tipo, SUM(monto) as total")
                ->groupBy('mes', 'tipo')
                ->orderBy('mes')
                ->get()
                ->groupBy('mes'),
        'transferenciasPorEstado' => Transfer::select('estado', DB::raw('COUNT(*) as total'))
                ->groupBy('estado')
                ->get(),
            'transferenciasPorMes' => Transfer::selectRaw("DATE_FORMAT(fecha, '%Y-%m') as mes, SUM(monto) as total")
                ->groupBy('mes')
                ->orderBy('mes')
                ->get(),
        ]);
    }
}