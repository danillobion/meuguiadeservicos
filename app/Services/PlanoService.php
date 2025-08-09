<?php

namespace App\Services;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Contato;
use App\Models\Endereco;
use App\Models\User;
use App\Models\UserPlanos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PlanoService
{
    public function credito($tipo = null)
    {
        $limite = UserPlanos::where('user_id', auth()->user()->id)->first();
        
        if($tipo == CatalogoTipo::SERVICO->value){
            $quantidade = Catalogo::where("tipo", CatalogoTipo::SERVICO)->where("user_id",auth()->user()->id)->count();

            
            $disponivel = $limite['num_servicos'] - $quantidade;

            if($disponivel == 0){
                return [
                    'credito' => 0,
                    'mensagem' => ' Vocé tem 0 crédito(s) disponível(s).',
                    'liberado' => false,
                    'quantidade' => $limite['num_servicos'] - $quantidade
                ];
            };

            if($disponivel > 0){
                return [
                    'credito' => $disponivel,
                    'mensagem' => ' Vocé tem '. $disponivel . ' crédito(s) disponível(s).',
                    'liberado' => true,
                    'quantidade' => $limite['num_servicos'] - $quantidade
                ];
            };
        }
        
        if($tipo == CatalogoTipo::ESTABELECIMENTO->value){
            $quantidade = Catalogo::where("tipo", CatalogoTipo::ESTABELECIMENTO)->where("user_id",auth()->user()->id)->count();
            
            $disponivel = $limite['num_estabelecimentos'] - $quantidade;

            if($disponivel == 0){
                return [
                    'credito' => 0,
                    'mensagem' => ' Vocé tem 0 crédito(s) disponível(s).',
                    'liberado' => false,
                    'quantidade' => $limite['num_estabelecimentos'] - $quantidade
                ];
            };

            if($disponivel > 0){
                return [
                    'credito' => $disponivel,
                    'mensagem' => ' Vocé tem '. $disponivel . ' crédito(s) disponível(s).',
                    'liberado' => true,
                    'quantidade' => $limite['num_estabelecimentos'] - $quantidade
                ];
            };
        }
        
    }
}
