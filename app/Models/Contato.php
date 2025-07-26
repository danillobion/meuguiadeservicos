<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Contato extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'contatos';

    protected $fillable = [
        'telefone',
        'email',
        'whatsapp',
        'telegram',
        'site',
        'facebook',
        'instagram',
    ];

}
