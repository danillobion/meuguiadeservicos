<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Tag;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Js;
use Inertia\Inertia;

class ConfiguracaoController extends Controller
{
    public function index()
    {
        $user = User::select("id", "name", "telefone")->find(auth()->user()->id);
        return Inertia::render('Configuracoes/MeusDados',[
            'user' => $user
        ]);
    }

    public function servicoIndex()
    {
        $catalogo = Catalogo::with("endereco", "tags")->where('user_id', auth()->user()->id)->where('tipo', CatalogoTipo::SERVICO)->first();
        $tagServicos = Tag::select('id', 'nome')->where("tipo", "SRV")->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        return Inertia::render('Configuracoes/Servico',[
            'catalogo' => $catalogo,
            'tagServicos' => $tagServicos
        ]);
    }

    public function estabelecimentoIndex()
    {
        $catalogo = Catalogo::with("endereco", "tags")->where('user_id', auth()->user()->id)->where('tipo', CatalogoTipo::ESTABELECIMENTO)->first();
        $tagEstabelecimentos = Tag::select('id', 'nome')->where("tipo", "EST")->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        return Inertia::render('Configuracoes/Estabelecimento',[
            'catalogo' => $catalogo,
            'tagEstabelecimentos' => $tagEstabelecimentos
        ]);
    }

    public function acessoIndex()
    {
        $user = User::select("id", "email")->find(auth()->user()->id);
        return Inertia::render('Configuracoes/Acesso',[
            'user' => $user
        ]);
    }

    # Outros endpoints

    public function atualizarConfiguracao(Request $request)
    {
        if($request->tipo == "meusDados")
        {
            validator($request->all(), [
                'nome' => 'required',
                'telefone' => 'nullable',
            ])->validate();

            $usuarioService = new UserService();
            $usuarioService->store($request);

            return response()->json([
                'status' => true,
                'message' => 'Dados atualizados com sucesso!'
            ]);
        }
    }

}
