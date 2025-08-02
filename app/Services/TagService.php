<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagService
{
    public function findAll()
    {
        return Tag::all();
    }
    
    public function salvar(Request $request)
    {
        DB::beginTransaction();

        $tag = is_null($request->id) ? new Tag() : Tag::find($request->id);
        $tag->nome = $request->nome;
        $tag->tipo = $request->tipo;
        $tag->save();

        DB::commit();
        return $tag; 
    }

    public function deletar(Request $request)
    {
        DB::beginTransaction();

        $tag = Tag::find($request->id);
        $tag->delete();

        DB::commit();
        return $tag;
    }
}
