<?php

use App\Http\Controllers\ApresentacaoController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\ConfiguracaoController;
use App\Http\Controllers\EstabelecimentoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumoController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ApresentacaoController::class, 'index'])->name('apresentacao.index');
Route::get('/pesquisar/{cidade?}/{texto?}/{tag_id?}', [ApresentacaoController::class, 'pesquisar'])->name('apresentacao.pesquisar');
Route::get('/catalogo/{id}', [ApresentacaoController::class, 'detalhe'])->name('apresentacao.detalhe');

Route::get('/como-divulgar', function () { 
    return Inertia::render('ComoDivulgar'); 
})->name('como-divulgar');

Route::get('/catalogo', [CatalogoController::class, 'index'])->name('catalogo.index');
Route::get('/consultar-cep/{cep}', [CatalogoController::class, 'consultarCep'])->name('consultar.cep');
Route::post('/catalogo/store', [CatalogoController::class, 'store'])->name('catalogo.store');
Route::post('/configuracoes/atualizar', [ConfiguracaoController::class, 'atualizarConfiguracao'])->name('catalogo.atualizar');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // meus dados
    Route::get('/meus-dados', [UsuarioController::class, 'meusDadosIndex'])->name('meus-dados.index');
    Route::get('/meus-dados/acesso', [UsuarioController::class, 'acessoIndex'])->name('meus-dados.acesso.index');
    Route::post('/meus-dados', [UsuarioController::class, 'store'])->name('meus-dados.store');

    // servico
    Route::get('/servico', [ServicoController::class, 'index'])->name('servico.index');
    Route::post('/servico', [ServicoController::class, 'store'])->name('servico.store');

    // estabelecimento
    Route::get('/estabelecimento', [EstabelecimentoController::class, 'index'])->name('estabelecimento.index'); //pagina e listar
    Route::get('/estabelecimento/cadastro/{id}', [EstabelecimentoController::class, 'editarIndex'])->name('estabelecimento.editar'); //pagina e detalhes
    Route::post('/estabelecimento', [EstabelecimentoController::class, 'store'])->name('estabelecimento.store'); //salvar
    Route::delete('/estabelecimento', [EstabelecimentoController::class, 'deletar'])->name('estabelecimento.deletar'); //deletar


    // Route::get('/configuracoes/servico', [ConfiguracaoController::class, 'servicoIndex'])->name('configuracoes.servico.index');
    // Route::get('/configuracoes/estabelecimento', [ConfiguracaoController::class, 'estabelecimentoIndex'])->name('configuracoes.estabelecimento.index');

    //resumo
    Route::get('/resumo', [ResumoController::class, 'index'])->name('resumo.index');

});

require __DIR__.'/auth.php';
