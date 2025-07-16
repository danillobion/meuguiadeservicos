<?php

namespace App\Enums;

enum CatalogoTipo: string
{
    case SERVICO = 'SEV';
    case ESTABELECIMENTO = 'EST';

    public function label(): string
    {
        return match($this) {
            self::SERVICO => 'Serviço',
            self::ESTABELECIMENTO => 'Estabelecimento'
        };
    }
    
    public static function toSelect(): array
    {
        return array_map(fn($tipo) => [
            'value' => $tipo->value,
            'label' => $tipo->label(),
        ], self::cases());
    }
}
