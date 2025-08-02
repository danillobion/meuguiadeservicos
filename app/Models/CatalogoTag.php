<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogoTag extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'catalogo_tag';
    public $timestamps = false;

    protected $fillable = [
        'tag_id',
        'catalogo_id',
    ];

    public function catalogo()
    {
        return $this->belongsTo(Catalogo::class);
    }
}
