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

class CatalogoService
{
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // endereco
            $endereco = new Endereco();
            $endereco->cep = $request->cep;
            $endereco->logradouro = $request->logradouro;
            $endereco->bairro = $request->bairro;
            $endereco->cidade = $request->cidade;
            $endereco->uf = $request->uf;
            $endereco->complemento = $request->complemento;
            $endereco->numero = $request->numero;
            $endereco->save();

            // user
            $user = new User();
            $user->name = $request->nome;
            $user->email = $request->email;
            $user->telefone = $request->telefone;
            $user->password = Hash::make($request->senha);
            $user->save();

            // catalogo
            $catalogo = new Catalogo();
            $catalogo->user_id = $user->id;
            $catalogo->endereco_id = $endereco->id;
            $catalogo->descricao = $request->descricao;

            if($request->tipo == CatalogoTipo::ESTABELECIMENTO->value){
                $catalogo->tipo = CatalogoTipo::ESTABELECIMENTO->value;
                $catalogo->nome = $request->nome_estabelecimento;
            } elseif ($request->tipo == CatalogoTipo::SERVICO->value) {
                $catalogo->tipo = CatalogoTipo::SERVICO->value;
                $catalogo->nome = $request->nome;
            }

            $catalogo->save();

            // habilidades
            if(!empty($request->habilidades)){
                foreach($request->habilidades as $habilidade){
                    $catalogoTag = new CatalogoTag();
                    $catalogoTag->catalogo_id = $catalogo->id;
                    $catalogoTag->tag_id = $habilidade['value'];
                    $catalogoTag->save();
                }
            }

            DB::commit();
            return $catalogo;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
