<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerificarAcessoUsuario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if ($user && $user->bloqueado == 1) {
            abort(403, "Conta bloqueada! Você não possui permissão para acessar a plataforma. Por favor, entre em contato por e-mail para obter mais informações.");
        }

        return $next($request);
    }
}
