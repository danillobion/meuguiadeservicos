<?php

use App\Http\Controllers\ApresentacaoController;
use App\Http\Controllers\CatalogoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResumoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ApresentacaoController::class, 'index'])->name('apresentacao.index');
Route::get('/pesquisar/{texto?}/{tag_id?}', [ApresentacaoController::class, 'pesquisar'])->name('apresentacao.pesquisar');

Route::get('/como-divulgar', function () { 
    return Inertia::render('ComoDivulgar'); 
})->name('como-divulgar');

Route::get('/catalogo', [CatalogoController::class, 'index'])->name('catalogo.index');
Route::get('/consultar-cep/{cep}', [CatalogoController::class, 'consultarCep'])->name('consultar.cep');
Route::post('/catalogo/store', [CatalogoController::class, 'store'])->name('catalogo.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //resumo
    Route::get('/resumo', [ResumoController::class, 'index'])->name('resumo.index');

});

require __DIR__.'/auth.php';
