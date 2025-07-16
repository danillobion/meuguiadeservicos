<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Tags
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('tipo', 3);
            $table->timestamps();
        });

        // Endereços
        Schema::create('enderecos', function (Blueprint $table) {
            $table->id();
            $table->string('cep');
            $table->string('uf', 2);
            $table->string('cidade');
            $table->string('bairro')->nullable();
            $table->string('logradouro')->nullable();
            $table->string('complemento')->nullable();
            $table->string('numero')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });

        // Catálogos
        Schema::create('catalogos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('endereco_id')->constrained()->onDelete('cascade');
            $table->string('caminho_imagem', 512)->nullable();
            $table->string('nome');
            $table->string('descricao')->nullable();
            $table->string('tipo');
            $table->timestamps();
        });

        // Catálogo de Tags
        Schema::create('catalogo_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tag_id')->constrained('tags')->onDelete('cascade');
            $table->foreignId('catalogo_id')->constrained('catalogos')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('catalogo_tag');
        Schema::dropIfExists('catalogos');
        Schema::dropIfExists('enderecos');
        Schema::dropIfExists('tags');
    }
};
