<?php

namespace App\Http\Controllers;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\Tag;
use App\Models\User;
use App\Services\CatalogoService;
use App\Services\TagService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboardIndex()
    {
        return Inertia::render('Admin/Dashboard',[
            'numeroUsuarios' => User::count(),
            'numeroServicos' => Catalogo::where("tipo", CatalogoTipo::SERVICO)->count(),
            'numeroEstabelecimentos' => Catalogo::where("tipo", CatalogoTipo::ESTABELECIMENTO)->count(),
            'numeroTags' => Tag::count()
        ]);
    }

    public function usuariosIndex()
    {
        return Inertia::render('Admin/Usuarios');
    }

    public function catalogosIndex()
    {
        return Inertia::render('Admin/Catalogo');
    }

    public function tagIndex()
    {
        return Inertia::render('Admin/Tag');
    }

    public function usuarioFindAll()
    {
        $userService = new UserService();
        return $userService->findAll();
    }

    public function usuarioAlterarStatus($id)
    {
        $userService = new UserService();
        return $userService->alterarStatus($id);
    }

    public function tagFindAll()
    {
        $tags = new TagService();
        return $tags->findAll();
    }

    public function tagSalvar(Request $request)
    {
        validator($request->all(), [
            'id' => 'nullable',
            'nome' => 'required',
            'tipo' => 'required',
        ])->validate();

        $tags = new TagService();
        return $tags->salvar($request);
    }

    public function tagAtualizar(Request $request)
    {
        validator($request->all(), [
            'id' => 'nullable',
            'nome' => 'required',
            'tipo' => 'required',
        ])->validate();

        $tags = new TagService();
        return $tags->salvar($request);
    }

    public function tagDeletar(Request $request)
    {
        validator($request->all(), [
            'id' => 'nullable',
        ])->validate();

        $tags = new TagService();
        return $tags->deletar($request);
    }

    public function catalogosFindAll()
    {
        $superAdmin = true;

        $tags = new CatalogoService();
        return $tags->findAll(null,$superAdmin);
    }

}
