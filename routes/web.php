<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApresentacaoController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\ConfiguracaoController;
use App\Http\Controllers\EstabelecimentoController;
use App\Http\Controllers\ResumoController;
use App\Http\Controllers\ServicoController;
use App\Http\Controllers\UsuarioController;
use App\Models\Catalogo;
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

    // - catalogo - 
    //listar
    Route::get('/catalogo/servicos/listar', [CatalogoController::class, 'catalogoServicosIndex'])->name('servico.listar');
    Route::get('/catalogo/estabelecimentos/listar', [CatalogoController::class, 'catalogoEstabelecimentosIndex'])->name('estabelecimento.listar');
    //detalhes
    Route::get('/catalogo/servico/{id}', [CatalogoController::class, 'catalogoServicoEditar'])->name('servico.editar');
    Route::get('/catalogo/estabelecimento/{id}', [CatalogoController::class, 'catalogoEstabelecimentoEditar'])->name('estabelecimento.editar');
    // Route::get('/catalogo/estabelecimento/{id}', [CatalogoController::class, 'catalogoEstabelecimentoEditar'])->name('estabelecimento.editar');
    //salvar
    Route::post('/catalogo', [CatalogoController::class, 'catalogoSalvar'])->name('catalogo.salvar');
    //deletar
    Route::delete('/catalogo/{id}', [CatalogoController::class, 'catalogoDeletar'])->name('catalogo.deletar');

    // servico
    Route::get('/servico', [ServicoController::class, 'index'])->name('servico.index');
    Route::post('/servico', [ServicoController::class, 'store'])->name('servico.store');

    // estabelecimento
    Route::get('/estabelecimento', [EstabelecimentoController::class, 'index'])->name('estabelecimento.index'); //pagina e listar
    // Route::get('/estabelecimento/cadastro/{id}', [EstabelecimentoController::class, 'editarIndex'])->name('estabelecimento.editar'); //pagina e detalhes
    Route::post('/estabelecimento', [EstabelecimentoController::class, 'store'])->name('estabelecimento.store'); //salvar
    Route::delete('/estabelecimento/{id}', [EstabelecimentoController::class, 'deletar'])->name('estabelecimento.deletar'); //deletar

    //resumo
    Route::get('/resumo', [ResumoController::class, 'index'])->name('resumo.index');

});

Route::middleware(['auth', 'root'])->group(function () {
    
    Route::get('/admin/dashboard', [AdminController::class, 'dashboardIndex'])->name('admin.dashboard.index');
    
    Route::get('/admin/usuarios', [AdminController::class, 'usuariosIndex'])->name('admin.usuarios.index');
    Route::get('/admin/usuarios/find-all', [AdminController::class, 'usuarioFindAll'])->name('admin.usuarios.find-all');
    Route::get('/admin/usuarios/alterar-status/{id}', [AdminController::class, 'usuarioAlterarStatus'])->name('admin.usuarios.alterar-status');

    Route::get('/admin/catalogos', [AdminController::class, 'catalogosIndex'])->name('admin.catalogos.index');
    Route::get('/admin/catalogos/find-all', [AdminController::class, 'catalogosFindAll'])->name('admin.catalogos.find-all');

    
    Route::get('/admin/tags', [AdminController::class, 'tagIndex'])->name('admin.tags.index');
    Route::get('/admin/tags/find-all', [AdminController::class, 'tagFindAll'])->name('admin.tags.find-all');
    Route::post('/admin/tags', [AdminController::class, 'tagSalvar'])->name('admin.tags.salvar');
    Route::put('/admin/tags/{id}', [AdminController::class, 'tagAtualizar'])->name('admin.tags.atualizar');
    Route::delete('/admin/tags', [AdminController::class, 'tagDeletar'])->name('admin.tags.deletar');


});

require __DIR__.'/auth.php';
