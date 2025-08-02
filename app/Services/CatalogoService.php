<?php

namespace App\Services;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Contato;
use App\Models\Endereco;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CatalogoService
{
    public function find($id = null, $tipo = null)
    {
        $user_id = auth()->user()->id;

        //novo catalogo
        if(is_null($id)){
            $catalogo = new Catalogo();
            $catalogo['tipo'] = $tipo;

        }else{
            $catalogo = Catalogo::with("endereco", "tags", "contato")->where('user_id', $user_id)->find($id);
        }

        return $catalogo;
    }

    public function findAll($tipo = null, $superAdmin = false)
    {
        if($superAdmin){
            return Catalogo::with("endereco", "tags", "contato")->get();
        }

        $catalogo = Catalogo::with("endereco", "tags", "contato")->where("user_id", auth()->user()->id)->where('tipo', $tipo)->get();
        return $catalogo;
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            
            $usuario = $request['novo_usuario'] ? new User() : null;

            if(!is_null($usuario)){
                $usuario->name = $request['nome_completo'];
                $usuario->email = $request['email_login'];
                $usuario->password = Hash::make($request['senha']);
                $usuario->save();
            };

            $endereco = is_null($request['endereco']['id']) ? new Endereco() : Endereco::find($request['endereco']['id']);
            $endereco->cep = $request['endereco']['cep'];
            $endereco->logradouro = $request['endereco']['logradouro'];
            $endereco->bairro = $request['endereco']['bairro'];
            $endereco->cidade = $request['endereco']['cidade'];
            $endereco->uf = $request['endereco']['uf'];
            $endereco->complemento = $request['endereco']['complemento'];
            $endereco->numero = $request['endereco']['numero'];
            $endereco->save();
            
            $contato = is_null($request['contato']['id']) ? new Contato() : Contato::find($request['contato']['id']);
            $contato->telefone = preg_replace('/[\-\(\)\s]/', '', $request['contato']['telefone']);
            $contato->email = $request['contato']['email'];
            $contato->whatsapp = $request['contato']['whatsapp'];
            $contato->telegram = $request['contato']['telegram'];
            $contato->site = $request['contato']['site'];
            $contato->facebook = $request['contato']['facebook'];
            $contato->instagram = $request['contato']['instagram'];
            $contato->save();
            
            $catalogo = is_null($request['id']) ? new Catalogo() : Catalogo::find($request['id']);
            $catalogo->user_id = $request['novo_usuario'] ? $usuario->id : auth()->user()->id;
            $catalogo->endereco_id = $endereco['id'];
            $catalogo->contato_id = $contato['id'];
            $catalogo->caminho_imagem = null;
            $catalogo->nome = $request['nome'];
            $catalogo->descricao = $request['descricao'];
            $catalogo->tipo = $request['tipo'];
            $catalogo->save();  

            if(!is_null($request['habilidades'])){
                CatalogoTag::where('catalogo_id', $catalogo->id)->delete();
                if ($request['habilidades']) {
                    foreach ($request['habilidades'] as $tag) {
                        $catalogoTag = new CatalogoTag();
                        $catalogoTag->catalogo_id = $catalogo['id'];
                        $catalogoTag->tag_id = $tag['value'];
                        $catalogoTag->save();  
                    }
                }
            }
            
            DB::commit();
            if(!is_null($usuario)){
                return $usuario;
            }
            return true;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function usuarioStore(Request $request)
    {
        DB::beginTransaction();
        try {
            
            $usuario = $request['novo_usuario'] ? new User() : null;

            $usuario->name = $request['nome_completo'];
            $usuario->email = $request['email_login'];
            $usuario->password = Hash::make($request['senha']);
            $usuario->save(); 
            
            DB::commit();
            if(!is_null($usuario)){
                return $usuario;
            }
            return true;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deletar($id)
    {
        $catalogo = Catalogo::find($id);

        if (!$catalogo) {
            return false;
        }

        CatalogoTag::where('catalogo_id', $catalogo->id)->delete(); 

        return $catalogo->delete();
    }
}
