<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Endereco extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'enderecos';

    protected $fillable = [
        'id',
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
