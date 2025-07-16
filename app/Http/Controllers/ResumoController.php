<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ResumoController extends Controller
{
    public function index()
    {
        return Inertia::render('Resumo');
    }
}
