<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use App\Services\ApresentacaoService;

class ApresentacaoController extends Controller
{
    public function index()
    {

        $apresentacaoService = new ApresentacaoService();
        $servicos = $apresentacaoService->listarServicos();

        $tags = Tag::select("id", "nome")
        ->whereHas('catalogoTags')
        ->withCount(['catalogoTags as quantidade'])
        ->orderByDesc('quantidade')
        ->get();

        return Inertia::render('Apresentacao',[
            'servicos' => $servicos,
            'tags' => $tags
        ]);
    }

    public function pesquisar($texto = null, $tag_id = null)
    {
        $apresentacaoService = new ApresentacaoService();
        $servicos = $apresentacaoService->listarServicos($texto,$tag_id);

        $tags = Tag::select("id", "nome")
        ->whereHas('catalogoTags')
        ->withCount(['catalogoTags as quantidade'])
        ->orderByDesc('quantidade')
        ->take(20) // Limita a quantidade de tags
        ->get();

        return [
            'servicos' => $servicos->toArray(),
            'tags' => $tags
        ];
    }
}
