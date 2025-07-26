<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Enums\TagEstabelecimento;
use App\Enums\TagServico;
use App\Models\Catalogo;
use App\Models\Contato;
use App\Models\Endereco;
use App\Models\Tag;
use App\Models\User;
use App\Services\CatalogoService;
use App\Services\CepService;
use App\Services\UserService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CatalogoController extends Controller
{

    //tela de cadastro (deslogado)
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
    // funcao de cadastrar (deslogado)
    public function store(Request $request)
    {
        validator($request->all(), [
            'id' => 'nullable',
            'nome' => 'nullable',
            'descricao' => 'required',
            'tipo' => 'required',

            'endereco.id' => 'nullable',
            'endereco.cep' => 'required',
            'endereco.uf' => 'required',
            'endereco.cidade' => 'required',
            'endereco.bairro' => 'nullable',
            'endereco.logradouro' => 'nullable',
            'endereco.complemento' => 'nullable',
            'endereco.numero' => 'required',

            'contato.id' => 'nullable',
            'contato.telefone' => 'required',
            'contato.email' => 'nullable',
            'contato.whatsapp' => 'nullable',
            'contato.telegram' => 'nullable',
            'contato.site' => 'nullable',
            'contato.facebook' => 'nullable',
            'contato.instagram' => 'nullable',
            
            'habilidades' => 'required|array',
            'novo_usuario' => 'nullable',
        ])->validate();

        $catalogoService = new CatalogoService();
        $resultado = $catalogoService->store($request);

        // novo usuario eu logo
        if($resultado['id']){
            event(new Registered($resultado));
            Auth::login($resultado);
            return redirect(route('apresentacao.index', absolute: false));
        }
        
        return redirect()->route('login')->with('message', 'Cadastro concluído.');

    }
    public function consultarCep($cep){
        $cepService = new CepService();
        $resultado = $cepService->consultar($cep);
        return response()->json($resultado);
    }
}
