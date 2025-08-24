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

        $query->with([
            'tags',
            'endereco' => function ($q) {
                $q->select('id', 'cidade', 'uf');
            }
        ]);

        if ($cidade && $cidade !== '-') {
            $query->whereHas('endereco', function ($q) use ($cidade) {
                $q->where('cidade', $cidade);
            });
        }

        if ($texto && $texto !== '-') {
            $query->where(function ($q) use ($texto) {
                $q->where('nome', 'like', '%' . $texto . '%')
                ->orWhereHas('tags', function ($sub) use ($texto) {
                    $sub->where('nome', 'like', '%' . $texto . '%');
                });
            });
        }

        if ($tagId && $tagId !== '-') {
            $query->whereHas('tags', function ($q) use ($tagId) {
                $q->where('tags.id', $tagId);
            });
        }

        $query->where('ativo', true)
            ->orderBy('created_at', 'desc');

        return $query->get();
    }

}
