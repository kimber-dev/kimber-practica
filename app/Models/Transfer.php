<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    protected $table = 'transfers';
    protected $primaryKey = 'id';
    public $timestamps = false;
use HasFactory;
    protected $fillable = [
        'remitente',
        'destinatario',
        'fecha',
        'agente',
        'monto',
        'estado',
        'cuenta',
        'observacion'
    ];
    public function fotos()
    {
        return $this->morphMany(Foto::class, 'imageable');
    }
}