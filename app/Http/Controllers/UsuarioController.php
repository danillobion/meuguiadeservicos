<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsuarioController extends Controller
{
    public function meusDadosIndex()
    {
        $user = User::select("id", "name", "telefone")->find(auth()->user()->id);
        return Inertia::render('MeusDados/MeusDados',[
            'user' => $user
        ]);
    }

    public function acessoIndex()
    {
        $user = User::select("id", "email")->find(auth()->user()->id);
        return Inertia::render('MeusDados/Acesso',[
            'user' => $user
        ]);
    }

    public function store(Request $request)
    {
        // meus dados
        if($request->tipo == "meusDados")
        {
            validator($request->all(), [
                'nome' => 'required',
                'telefone' => 'nullable',
            ])->validate();

            $usuarioService = new UserService();
            $usuarioService->store($request);

            return response()->json([
                'status' => true,
                'message' => 'Dados atualizados com sucesso!'
            ]);
        }

        // acesso
        if($request->tipo == "acesso")
        {
            validator($request->all(), [
                'email' => 'required|email',
                'senha' => 'required',
                'confirmacao_senha' => 'required|same:senha',
            ])->validate();

            $usuarioService = new UserService();
            $usuarioService->store($request);

            return response()->json([
                'status' => true,
                'message' => 'Dados atualizados com sucesso!'
            ]);
        }   

    }
}
