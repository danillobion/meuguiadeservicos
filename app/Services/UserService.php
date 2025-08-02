<?php

namespace App\Services;

use App\Enums\CatalogoTipo;
use App\Models\Catalogo;
use App\Models\CatalogoTag;
use App\Models\Contato;
use App\Models\Endereco;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = is_null($request->id) ? new User() : User::find($request->id);
            if(!is_null($request->nome)){
                $user->name = $request->nome;
            }
            if(!is_null($request->name)){
                $user->name = $request->name;
            }
            if(!is_null($request->email)){
                $user->email = $request->email;
            }
            if(!is_null($request->telefone)){
                $user->telefone = $request->telefone;
            }
            if(!is_null($request->password)){
                $user->password = $request->password;
            }
            $user->save();

            DB::commit();
            return $user;

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function findAll(){
        return User::all();
    }

    public function alterarStatus($id)
    {
        $user = User::find($id);
        $user->status = !$user->status;
        $user->save();
        return $user;
    }
}
