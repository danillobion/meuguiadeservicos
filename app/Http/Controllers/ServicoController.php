<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Contato;
use App\Models\Endereco;
use App\Models\Tag;
use App\Services\CatalogoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ServicoController extends Controller
{
    public function index()
    {
        $service = new CatalogoService();
        $catalogo = $service->find(null,CatalogoTipo::SERVICO->value);
        
        $tagServicos = Tag::select('id', 'nome')->where("tipo", "SRV")->get();

        return Inertia::render('Servico/Page',[
            'catalogo' => $catalogo,
            'tagServicos' => $tagServicos
        ]);
    }

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
        ])->validate();

        $catalogoService = new CatalogoService();
        $resultado = $catalogoService->store($request);

        return response()->json([
            'status' => $resultado,
            'message' => $resultado ? 'Cadastro realizado com sucesso!' : 'Erro ao realizar cadastro!'
        ]);
    }
}
