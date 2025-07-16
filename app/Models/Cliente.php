<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class Cliente extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'telefono',
    ];
}