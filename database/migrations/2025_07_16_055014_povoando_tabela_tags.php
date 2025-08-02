<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $servicos = [
            'Eletricista',
            'Encanador',
            'Marceneiro',
            'Pedreiro',
            'Jardineiro',
            'Diarista',
            'Cuidador de Idoso',
            'Babá',
            'Motorista',
            'Personal Trainer',
            'Aulas Particulares',
            'Design Gráfico',
            'Programador',
            'Freelancer Administrativo',
            'Maquiador',
            'Cabeleireiro a domicílio',
            'Manutenção de Computador',
            'Assistência Técnica',
            'Limpador de Piscina',
            'Organizador de Eventos',
            'Garçom Freelancer',
            'DJ',
            'Segurança para Eventos',
            'Consultor Financeiro',
            'Advogado',
            'Contador',
            'Reparos Gerais',
            'Montador de Móveis',
            'Passeador de Cães',
            'Treinador de Cães',
            'Massoterapeuta',
            'Nutricionista',
            'Psicólogo',
            'Tradutor',
            'Revisor de Textos',
            'Videomaker',
            'Social Media',
            'Consultor de Imagem',
            'Marceneiro Planejado',
            'Vidraceiro',
            'Serralheiro',
            'Costureira',
            'Técnico em Celular',
            'Técnico em Informática',
            'Eletricista Automotivo',
            'Guincho',
            'Enfermeiro Domiciliar',
            'Maestro para Eventos',
            'Instalador de Ar Condicionado',
            'Instalador de CFTV',
            'Pintor',
            'Zelador',
            'Faxineira para Empresas',
            'Lavador de Carros',
            'Motoboy',
            'Entregador',
            'Fotógrafo',
            'Cameraman',
            'Ilustrador',
            'Encanador Industrial',
            'Cozinheira Doméstica',
            'Chef de Cozinha',
            'Decorador de Interiores',
            'Engenheiro Civil',
            'Arquiteto',
            'Técnico de Redes',
            'Suporte de TI',
            'Barbeiro',
            'Tatuador',
            'Esteticista',
            'Manicure/Pedicure',
            'Depilador(a)',
            'Coach de Carreira',
            'Consultor de Negócios',
            'Redator',
            'Locutor',
            'Palestrante',
            'Acompanhante Hospitalar',
            'Monitor de Transporte Escolar',
            'Instrutor de Música',
            'Instrutor de Idiomas',
            'Professor de Reforço Escolar',
            'Preparador para Concursos',
            'Mestre de Obras',
            'Azulejista',
            'Gesseiro',
            'Marceneiro Artesanal',
            'Tapeceiro',
            'Relojoeiro',
            'Sintonizador de Antenas',
            'Aplicador de Película',
            'Mecânico de Bicicletas',
            'Mecânico de Motos',
        ];

        $estabelecimentos = [
            'Restaurante',
            'Lanchonete',
            'Pizzaria',
            'Padaria',
            'Cafeteria',
            'Choperia',
            'Pet Shop',
            'Clínica Veterinária',
            'Academia',
            'Salão de Beleza',
            'Barbearia',
            'Loja de Roupas',
            'Supermercado',
            'Loja de Conveniência',
            'Farmácia',
            'Clínica Odontológica',
            'Clínica de Estética',
            'Auto Escola',
            'Oficina Mecânica',
            'Loja de Celular',
            'Lan House',
            'Borracharia',
            'Posto de Combustível',
            'Loja de Materiais de Construção',
            'Papelaria',
            'Loja de Brinquedos',
            'Livraria',
            'Cinema',
            'Parque de Diversões',
            'Hotel',
            'Pousada',
            'Chalé',
            'Agência de Turismo',
            'Buffet para Eventos',
            'Espaço para Festas',
            'Loja de Móveis',
            'Loja de Eletrodomésticos',
            'Ateliê de Costura',
            'Sebo',
            'Aluguel de Roupas',
            'Loja de Informática',
            'Loja de Esportes',
        ];

        $now = now();

        $dataServicos = array_map(fn($nome) => [
            'nome' => $nome,
            'tipo' => 'SER',
            'created_at' => $now,
            'updated_at' => $now,
        ], $servicos);

        $dataEstabelecimentos = array_map(fn($nome) => [
            'nome' => $nome,
            'tipo' => 'EST',
            'created_at' => $now,
            'updated_at' => $now,
        ], $estabelecimentos);

        DB::table('tags')->insert(array_merge($dataServicos, $dataEstabelecimentos));
    }

    public function down(): void
    {
        // $servicos = [...]; // mesmo array acima

        // $estabelecimentos = [...]; // mesmo array acima

        // DB::table('tags')
        //     ->whereIn('nome', $servicos)
        //     ->where('tipo', 'SER')
        //     ->delete();

        // DB::table('tags')
        //     ->whereIn('nome', $estabelecimentos)
        //     ->where('tipo', 'EST')
        //     ->delete();
    }
};
