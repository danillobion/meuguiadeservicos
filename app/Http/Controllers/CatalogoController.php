<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Models\Tag;
use App\Services\CatalogoService;
use App\Services\CepService;
use App\Services\PlanoService;
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
        
        $tagServicos = Tag::select('id', 'nome')->where("tipo", "SER")->get()
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
            'novo_usuario' => 'nullable', //flag
            'nome_completo' => 'required_if:novo_usuario,1|min:3',
            'email_login' => 'required_if:novo_usuario,1|email',
            'senha' => 'required_if:novo_usuario,1|min:8',
            'confirmacao_senha' => 'required_if:novo_usuario,1|same:senha',
        ])->validate();

        $catalogoService = new CatalogoService();
        $resultado = $catalogoService->usuarioStore($request);

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

    // Catalogo
    //pagina
    public function catalogoServicosIndex()
    {
        $tipo = CatalogoTipo::SERVICO->value;
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->findAll($tipo);

        $plano = new PlanoService();

        return Inertia::render('Catalogo/List',[
            'catalogo' => $catalogo,
            'tipo' => $tipo,
            'credito' => $plano->credito($tipo)
        ]);
    }
    public function catalogoEstabelecimentosIndex()
    {
        $tipo = CatalogoTipo::ESTABELECIMENTO->value;
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->findAll($tipo);
        
        $plano = new PlanoService();

        return Inertia::render('Catalogo/List',[
            'catalogo' => $catalogo,
            'tipo' => $tipo,
            'credito' => $plano->credito($tipo)
        ]);
    }
    //encontrar
    public function catalogoServicoEditar($id = null)
    {
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->find($id);

        $tipo = CatalogoTipo::SERVICO->value;

        $tags = Tag::select('id', 'nome')->where("tipo",$tipo)->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        return Inertia::render('Catalogo/Edit',[
            'catalogo' => $catalogo,
            'tipo' => $tipo,
            'tags' => $tags
        ]);
    }
    public function catalogoEstabelecimentoEditar($id = null)
    {
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->find($id);

        $tipo = CatalogoTipo::ESTABELECIMENTO->value;

        $tags = Tag::select('id', 'nome')->where("tipo", $tipo)->get()
            ->map(function($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->nome,
            ];
        });

        return Inertia::render('Catalogo/Edit',[
            'catalogo' => $catalogo,
            'tipo' => $tipo,
            'tags' => $tags
        ]);
    }
    //salvar
    public function catalogoSalvar(Request $request)
    {
        validator($request->all(), [
            'id' => 'nullable',
            'nome' => 'required',
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
        $catalogoService->store($request);

        if($request['tipo'] == CatalogoTipo::SERVICO->value){
            return redirect()->route('servico.listar')->with('success', 'Cadastro concluído.');
        }

        if($request['tipo'] == CatalogoTipo::ESTABELECIMENTO->value){
            return redirect()->route('estabelecimento.listar')->with('success', 'Cadastro concluído.');
        }
    }
    //deletar
    public function catalogoDeletar($id)
    {
        $catalogoService = new CatalogoService();
        $catalogo = $catalogoService->find($id);
        $catalogoService->deletar($id);

        return response()->json([
            'message' => $catalogo['tipo']  == CatalogoTipo::SERVICO->value ? 'Serviço excluído.' : 'Estabelecimento excluído.',
            'tipo' => $catalogo['tipo'],
        ]);
    }
}
