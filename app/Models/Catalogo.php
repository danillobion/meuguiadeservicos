<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Catalogo extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'catalogos';

    protected $fillable = [
        'user_id',
        'endereco_id',
        'contato_id',
        'nome',
        'descricao',
        'tipo',
    ];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'catalogo_tag', 'catalogo_id', 'tag_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function endereco()
    {
        return $this->belongsTo(Endereco::class);
    }

    public function contato()
    {
        return $this->belongsTo(Contato::class);
    }

}
