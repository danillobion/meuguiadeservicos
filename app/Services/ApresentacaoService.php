<?php

namespace App\Services;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Endereco;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ApresentacaoService
{

    public function listarServicos($texto = null, $tag_id = null)
    {
        $query = Catalogo::query();
        $query->with(['tags', 'endereco']);

        if(!is_null($texto) && $texto != '-'){
            $query->where('nome', 'like', '%'.$texto.'%');
        }

        if(!is_null($tag_id)){
            $query->whereHas('tags', function ($query) use ($tag_id) {
                $query->where('tag_id', $tag_id);
            });
        }
        $resposta = $query->get();
        return $resposta;
    }
}
