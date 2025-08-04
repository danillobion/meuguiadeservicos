<?php

namespace App\Http\Controllers;

use App\Models\Catalogo;
use App\Models\Endereco;
use App\Models\Tag;
use App\Models\User;
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

    public function pesquisar($cidade = null, $texto = null, $tag_id = null)
    {
        $apresentacaoService = new ApresentacaoService();
        $servicos = $apresentacaoService->listarServicos($cidade,$texto,$tag_id);

        $cidades = Endereco::selectRaw('MIN(id) as id, cidade, uf')
            ->groupBy('cidade', 'uf')
            ->get();

        $tags = Tag::select("id", "nome")
            ->whereHas('catalogoTags')
            ->withCount(['catalogoTags as quantidade'])
            ->orderByDesc('quantidade')
            ->take(20) // Limita a quantidade de tags
            ->get();

        return [
            'cidades' => $cidades->toArray(),
            'servicos' => $servicos->toArray(),
            'tags' => $tags
        ];
    }

    public function detalhe($id)
    {
        $catalogo = Catalogo::with([
            'tags',
            'user',
            'contato',
            'endereco' => function ($query) {
                $query->select('id', 'cidade', 'uf');
            }
        ])->findOrFail($id);

        return Inertia::render('Detalhe',[
            'catalogo' => $catalogo
        ]);
    }

    public function tutorial()
    {
        $usuario = auth()->user();
        $usuario->tutorial = false;
        $usuario->save();

        return response()->json(['success' => true]);
    }
}
