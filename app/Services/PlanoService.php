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

class PlanoService
{
    public function credito($tipo = null)
    {
        if($tipo == CatalogoTipo::SERVICO->value){
            $quantidade = Catalogo::where("tipo", CatalogoTipo::SERVICO)->where("user_id",auth()->user()->id)->count();
            
            $disponivel = 2 - $quantidade;

            if($disponivel == 0){
                return [
                    'credito' => 0,
                    'mensagem' => ' Vocé tem 0 crédito(s) disponível(s).',
                    'liberado' => false,
                ];
            };

            if($disponivel == 1){
                return [
                    'credito' => 1,
                    'mensagem' => ' Vocé tem 1 crédito(s) disponível(s).',
                    'liberado' => true,
                ];
            };

            if($disponivel == 2){
                return [
                    'credito' => 2,
                    'mensagem' => ' Vocé tem 2 crédito(s) disponível(s).',
                    'liberado' => true,
                ];
            };
        }
        
        if($tipo == CatalogoTipo::ESTABELECIMENTO->value){
            $quantidade = Catalogo::where("tipo", CatalogoTipo::ESTABELECIMENTO)->where("user_id",auth()->user()->id)->count();
            
            $disponivel = 2 - $quantidade;

            if($disponivel == 0){
                return [
                    'credito' => 0,
                    'mensagem' => ' Vocé tem 0 crédito(s) disponível(s).',
                    'liberado' => false,
                ];
            };

            if($disponivel == 1){
                return [
                    'credito' => 1,
                    'mensagem' => ' Vocé tem 1 crédito(s) disponível(s).',
                    'liberado' => true,
                ];
            };

            if($disponivel == 2){
                return [
                    'credito' => 2,
                    'mensagem' => ' Vocé tem 2 crédito(s) disponível(s).',
                    'liberado' => true,
                ];
            };
        }
        
    }
}
