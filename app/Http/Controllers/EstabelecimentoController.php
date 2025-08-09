<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\Tag;
use App\Services\CatalogoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EstabelecimentoController extends Controller
{
    public function index()
    {
        // $service = new CatalogoService();
        // $catalogos = $service->findAll(CatalogoTipo::ESTABELECIMENTO->value);

        // return Inertia::render('Estabelecimento/Page',[
        //     'estabelecimentos' => $catalogos,
        // ]);
        
    }

    public function editarIndex($id)
    {
        $tipo = CatalogoTipo::ESTABELECIMENTO->value;
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->find($id, null);

        if(is_null($catalogo)){
            $catalogo = new Catalogo();
            $catalogo['tipo'] = $tipo;
        }

        $tagEstabelecimentos = Tag::select('id', 'nome')->where("tipo", $tipo)->get();

        return Inertia::render('Servico/Page',[
            'catalogo' => $catalogo,
            'tagServicos' => $tagEstabelecimentos
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

    public function deletar($id)
    {
        $catalogoService = new CatalogoService();
        $resultado = $catalogoService->deletar($id);
        return response()->json([
            'status' => $resultado,
            'message' => $resultado ? 'Cadastro deletado com sucesso!' : 'Erro ao deletar cadastro!'
        ]);
    }
}
