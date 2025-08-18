<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Catalogo extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'catalogos';

    protected $fillable = [
        'user_id',
        'endereco_id',
        'contato_id',
        'nome',
        'descricao',
        'tipo',
        'ativo',
    ];
    
    protected $appends = ['created_at_formatado'];

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
    
    public function getCreatedAtFormatadoAttribute()
    {
        return Carbon::parse($this->created_at)
                    ->locale('pt_BR')
                    ->translatedFormat('d \d\e F \d\e Y - H:i');
    }


}
