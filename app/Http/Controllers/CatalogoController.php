<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Enums\TagEstabelecimento;
use App\Enums\TagServico;
use App\Models\Tag;
use App\Services\CatalogoService;
use App\Services\CepService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogoController extends Controller
{

    public function index()
    {
        $tipos = CatalogoTipo::toSelect();
        
        $tagServicos = Tag::select('id', 'nome')->where("tipo", "SRV")->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        $tagEstabelecimentos = Tag::select('id', 'nome')->where("tipo", "EST")->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        return Inertia::render('Cadastro',[
            'tipos' => $tipos,
            'tagServicos' => $tagServicos,
            'tagEstabelecimentos' => $tagEstabelecimentos
        ]
    );
    }

    public function store(Request $request)
    {
        validator($request->all(), [
            'nome' => 'required',
            'nome_estabelecimento' => 'nullable',
            'descricao' => 'required',
            'tipo' => 'required',
            'cep' => 'required',
            'logradouro' => 'nullable',
            'bairro' => 'nullable',
            'cidade' => 'required',
            'uf' => 'required',
            'complemento' => 'nullable',
            'numero' => 'required',
            'telefone' => 'required',
            'email' => 'required|email',
            'senha' => 'required',
            'confirmacao_senha' => 'required|same:senha',
            'habilidades' => 'required|array',
        ])->validate();

        $catalogoService = new CatalogoService();
        $catalogoService->store($request);

        return redirect()->route('login')->with('success', 'Cadastro realizado com sucesso! Faça login para continuar.');
        
    }

    public function consultarCep($cep){
        $cepService = new CepService();
        $resultado = $cepService->consultar($cep);
        return response()->json($resultado);
    }
}
