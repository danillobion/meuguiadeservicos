<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogoTag extends Model
{
    use HasFactory;

    protected $table = 'catalogo_tag';
    public $timestamps = false;

    protected $fillable = [
        'tag_id',
        'catalogo_id',
        'nome',
    ];

    public function catalogo()
    {
        return $this->belongsTo(Catalogo::class);
    }
}
