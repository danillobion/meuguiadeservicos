import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, useForm, Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Acesso({user}) {
    
    const cabecalho = {
        titulo: "Meus dados: Acesso",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/meus-dados", label: "Meus dados" },
            { href: "/meus-dados/acesso", label: "Acesso" },
        ],
    };
    const abas = [
        { href: "/meus-dados", label: "Meus dados" },
        { href: "/meus-dados/acesso", label: "Acesso", active: true },
    ]

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        senhaAtual: '',
        novaSenha: '',
        confirmacaoNovaSenha: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('catalogo.store'));
    };

    useEffect(() => {
        if (user) {
            setData('email', user.email);
        }
    }, [user]);

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />

            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">
                <CabecalhoPagina cabecalho={cabecalho} />
                
                <AbasPagina cabecalho={abas} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg rounded-tl-none z-10">
                    <div className="p-6 text-gray-900">
                        <form onSubmit={handleSubmit} className="space-y-4">
                        
                            {/* Acesso */}
                            <h1 className="text-2xl text-gray-600">Acesso</h1>

                            <div className="space-y-2">
                            <InputLabel htmlFor="email" value="E-mail" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="mt-1 block w-full mt-1 block w-full py-4 pr-4 text-2xl"
                                autoComplete="email"
                                placeholder="Digite o e-mail"
                                disabled 
                            />
                            {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                            </div>


                            <div className="space-y-2">
                                <InputLabel htmlFor="senhaAtual" value="Senha atual" />
                                <TextInput
                                    id="senhaAtual"
                                    type="password"
                                    name="senhaAtual"
                                    value={data.senhaAtual}
                                    onChange={e => setData('senhaAtual', e.target.value)}
                                    className="mt-1 block w-full mt-1 block w-full py-4 pr-4 text-2xl"
                                    autoComplete="new-password"
                                    placeholder="Digite a senha atual"
                                    required
                                />
                                {errors.senhaAtual && <div className="text-red-600 text-sm">{errors.senhaAtual}</div>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="novaSenha" value="Nova senha" />
                                <TextInput
                                    id="novaSenha"
                                    type="password"
                                    name="novaSenha"
                                    value={data.novaSenha}
                                    onChange={e => setData('novaSenha', e.target.value)}
                                    className="mt-1 block w-full mt-1 block w-full py-4 pr-4 text-2xl"
                                    autoComplete="new-password"
                                    placeholder="Digite a nova senha"
                                    required
                                />
                                {errors.novaSenha && <div className="text-red-600 text-sm">{errors.novaSenha}</div>}
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="confirmacaoNovaSenha" value="Confirmar Senha" />
                                <TextInput
                                    id="confirmacaoNovaSenha"
                                    type="password"
                                    name="confirmacaoNovaSenha"
                                    value={data.confirmacaoNovaSenha}
                                    onChange={e => setData('confirmacaoNovaSenha', e.target.value)}
                                    className="mt-1 block w-full mt-1 block w-full py-4 pr-4 text-2xl"
                                    autoComplete="new-password"
                                    placeholder="Confirme a nova senha"
                                    required
                                />
                                {errors.confirmacaoNovaSenha && <div className="text-red-600 text-sm">{errors.confirmacaoNovaSenha}</div>}
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
