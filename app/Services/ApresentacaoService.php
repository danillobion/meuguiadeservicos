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

    public function listarServicos($cidade = "-", $texto = "-", $tagId = "-")
    {
        $query = Catalogo::query();
        $query->with(['tags', 'endereco']);

        if (!empty($cidade) && $cidade != '-') {
            $query->whereHas('endereco', function ($q) use ($cidade) {
                $q->where('cidade', $cidade);
            });
        }

        if (!is_null($texto) && $texto !== '-') {
            $query->where(function ($q) use ($texto) {
                $q->where('nome', 'like', '%' . $texto . '%')
                ->orWhereHas('tags', function ($sub) use ($texto) {
                    $sub->where('nome', 'like', '%' . $texto . '%');
                });
            });
        }

        if(!is_null($tagId) && $tagId != '-'){
            $query->whereHas('tags', function ($query) use ($tagId) {
                $query->where('tag_id', $tagId);
            });
        }
        $query->orderBy('created_at', 'desc');
        $resposta = $query->get();
        return $resposta;
    }
}
