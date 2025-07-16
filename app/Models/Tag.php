<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Tag extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tags';

    protected $fillable = [
        'nome',
        'tipo',
    ];

    public function catalogoTags()
    {
        return $this->hasMany(CatalogoTag::class, 'tag_id');
    }
}
