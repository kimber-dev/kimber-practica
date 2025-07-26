<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    protected $table = 'gastos';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'descripcion',
        'monto',
        'fecha',
        'tipo',
        'estado',
    ];
    public function fotos()
    {
        return $this->morphMany(Foto::class, 'imageable');
    }
}