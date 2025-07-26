<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

            $mensagem = 'Dados atualizados com sucesso!';
            return redirect()->route('meus-dados.index')->with('success', $mensagem);
        }

        // acesso
        if($request->tipo == "acesso")
        {
            // Validação dos dados
            $request->validate([
                'email' => 'required|email',
                'senhaAtual' => 'required|min:8',
                'novaSenha' => 'required|min:8',
                'confirmacaoNovaSenha' => 'required|same:novaSenha',
            ]);

            // Verificar se a senha atual está correta
            $user = auth()->user();
            if (!Hash::check($request->senhaAtual, $user->password)) {
                return back()->withErrors(['senhaAtual' => 'A senha atual está incorreta.']);
            }

            // Atualizar os dados do usuário
            $user->email = $request->email;
            $user->password = Hash::make($request->novaSenha);
            $user->save();

            // Redirecionar com mensagem de sucesso
            return redirect()
            ->route('meus-dados.acesso.index')
            ->with('success', 'Dados atualizados com sucesso!');
            }   

    }
}
