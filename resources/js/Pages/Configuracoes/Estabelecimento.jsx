import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { formatarCep } from '@/utils/formatarCEP';
import { formatarTelefone } from '@/utils/formatarTelefone';
import Select from 'react-select';
import { Head, useForm, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState, selectRef } from 'react';
import TextAreaInput from '@/Components/TextAreaInput';
import ServicoOuEstabelecimentoForm from '@/Components/form/ServicoOuEstabelecimentoForm';

export default function Estabelecimento({catalogo, tagEstabelecimentos}) 
{
    const cabecalho = {
        titulo: "Configurações: Estabelecimento",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/configuracoes/meus-dados", label: "Configurações" },
            { href: "/configuracoes/estabelecimento", label: "Estabelecimento" },
        ],
    };

    const abas = [
        { href: "/configuracoes/meus-dados", label: "Meus dados" },
        { href: "/configuracoes/servico", label: "Serviço" },
        { href: "/configuracoes/estabelecimento", label: "Estabelecimento", active: true },
        { href: "/configuracoes/acesso", label: "Acesso" },
    ]

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />
            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

                <CabecalhoPagina cabecalho={cabecalho} />
                <AbasPagina cabecalho={abas} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg rounded-tl-none z-10">
                    <div className="p-6 text-gray-900">
                        <ServicoOuEstabelecimentoForm catalogo={catalogo} tags={tagEstabelecimentos} />
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
