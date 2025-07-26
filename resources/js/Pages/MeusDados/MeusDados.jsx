import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { formatarTelefone } from '@/utils/formatarTelefone';
import { toast } from "sonner"

export default function MeusDados({user}) 
{
    const cabecalho = {
        titulo: "Meus dados",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/meus-dados", label: "Meus dados" },
        ],
    };
    const abas = [
        { href: "/meus-dados", label: "Meus dados", active: true },
        { href: "/meus-dados/acesso", label: "Acesso" },
    ]

    const { data, setData, processing, errors } = useForm({
        id: '',
        nome: '',
        telefone: '',
        tipo: '',
    });
    
    useEffect(() => {
        if (user) {
            setData('id', user.id);
            setData('nome', user.name || '');
            setData('telefone', user.telefone || '');
            setData('tipo', "meusDados");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('meus-dados.store'), data);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />

            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

                <CabecalhoPagina cabecalho={cabecalho} />

                <AbasPagina cabecalho={abas} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg rounded-tl-none z-10">
                    <div className="p-6 text-gray-900">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="text-2xl text-gray-600">Informações</h1>
                            {/* Nome */}
                            <div className="space-y-2">
                            <InputLabel htmlFor="nome" value="Nome e sobrenome" />
                            <TextInput
                                id="nome"
                                type="text"
                                name="nome"
                                value={data.nome}
                                onChange={e => setData('nome', e.target.value)}
                                className="mt-1 block w-full py-4 pr-4 text-2xl"
                                autoComplete="nome"
                                placeholder="Digite seu nome e sobrenome"
                                required
                            />
                                {errors.nome && <div className="text-red-600 text-sm">{errors.nome}</div>}
                            </div>

                            <h1 className="text-2xl text-gray-600">Contato</h1>
                            {/* Nome */}
                            <div className="space-y-2">
                            <InputLabel htmlFor="telefone" value="Telefone" />
                            <TextInput
                                id="telefone"
                                type="text"
                                name="telefone"
                                value={data.telefone}
                                onChange={e => setData('telefone', formatarTelefone(e.target.value))}
                                className="mt-1 block w-full py-4 pr-4 text-2xl"
                                autoComplete="telefone"
                                placeholder="Digite o número de telefone"
                            />
                            {errors.telefone && <div className="text-red-600 text-sm">{errors.telefone}</div>}
                            </div>

                            <button
                            type="submit"
                              disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded w-full text-center text-lg shadow"
                            >
                                {processing ? 'Processando...' : 'Salvar'}
                            </button>

                            <div className="mt-4">
                            <Link
                                href={route('apresentacao.index')}
                                className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold px-4 py-4 rounded text-lg"
                            >
                                Cancelar
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </MenuSuperior>
    );
}
