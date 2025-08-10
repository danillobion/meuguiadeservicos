<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\CatalogoTipo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'telefone',
        'bloqueado',
        'root',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    protected $appends = ['quantidade_servico_cadastrado', 'quantidade_estabelecimento_cadastrado'];

    public function plano()
    {
        return $this->hasOne(UserPlanos::class);
    }

    public function getQuantidadeServicoCadastradoAttribute()
    {
        return Catalogo::where('user_id', $this->id)->where('tipo', CatalogoTipo::SERVICO->value)->count();

    }

    public function getQuantidadeEstabelecimentoCadastradoAttribute()
    {
        return Catalogo::where('user_id', $this->id)->where('tipo', CatalogoTipo::ESTABELECIMENTO->value)->count();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
