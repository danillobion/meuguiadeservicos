<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Endereco extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'enderecos';

    protected $fillable = [
        'cep',
        'uf',
        'cidade',
        'bairro',
        'logradouro',
        'complemento',
        'numero',
        'latitude',
        'longitude',
    ];
}
