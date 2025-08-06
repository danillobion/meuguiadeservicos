<?php

use App\Models\User;
use App\Models\UserPlanos;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('atualizarUsuarioPlanos', function () {
    $usuarios = \App\Models\User::with('plano')->get();

    foreach ($usuarios as $item) {
        if (is_null($item->plano)) {
            $plano = new \App\Models\UserPlanos();
            $plano->user_id = $item->id;
            $plano->num_servicos = 2;
            $plano->num_estabelecimentos = 2;
            $plano->save();

            $this->info("Plano criado para o usuário ID {$item->id}");
        }
    }

    $this->info('Todos os usuários verificados.');
});
