<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CepService
{
    public function consultar($cep)
    {
        $cep = preg_replace('/[^0-9]/', '', $cep); // limpa o CEP

        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

        if ($response->successful() && !isset($response['erro'])) {
            return $response->json();
        }

        return [
            'error' => 'CEP não encontrado ou inválido.'
        ];
    }
}
