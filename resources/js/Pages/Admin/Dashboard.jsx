import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import AbasPagina from '@/components/ui/AbasPagina';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { formatarCep } from '@/utils/formatarCEP';
import { formatarTelefone } from '@/utils/formatarTelefone';
import Select from 'react-select';
import { Head, useForm, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState, selectRef } from 'react';
import TextAreaInput from '@/components/TextAreaInput';
import ServicoOuEstabelecimentoForm from '@/components/form/ServicoOuEstabelecimentoForm';

export default function Dashboard({ numeroUsuarios,numeroServicos,numeroEstabelecimentos,numeroTags }) {
    const cabecalho = {
        titulo: "Dashboard",
        migalhas: [
            { href: "/", label: "Início" },
            { href: "/admin/dashboard", label: "Dashboard" },
        ],
    };

    return (
        <MenuSuperior
            numeroUsuarios={numeroUsuarios}
            numeroServicos={numeroServicos}
            numeroEstabelecimentos={numeroEstabelecimentos}
            numeroTags={numeroTags}
        >
            <Head title={cabecalho.titulo} />

            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">
                <CabecalhoPagina cabecalho={cabecalho} />

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="text-lg font-medium text-gray-700">Usuários</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{numeroUsuarios}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="text-lg font-medium text-gray-700">Serviços</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{numeroServicos}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="text-lg font-medium text-gray-700">Estabelecimentos</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{numeroEstabelecimentos}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="text-lg font-medium text-gray-700">Catalogo (Serviços + Estabelecimentos)</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{numeroEstabelecimentos+numeroServicos}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h3 className="text-lg font-medium text-gray-700">Tags</h3>
                        <p className="mt-2 text-3xl font-bold text-gray-900">{numeroTags}</p>
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
