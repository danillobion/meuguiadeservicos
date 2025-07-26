import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Acesso({user}) 
{
    const { flash } = usePage().props;
    
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
        tipo: 'acesso'
    });

    const handleSubmit = (e) => {
        if (e?.preventDefault) e.preventDefault();
        post(route('meus-dados.store'), {
            onSuccess: () => {
                // Nada a fazer aqui — o backend já está redirecionando
            },
            onError: () => {
                toast.error("Erro ao cadastrar.");
            }
        });
    };

    useEffect(() => {
        if (user) {
            setData('email', user.email);
        }
    }, [user]);


    useEffect(() => {
        if (flash?.success) {
        toast.success(flash.success);
        }
        if (flash?.error) {
        toast.error(flash.error);
        }
    }, [flash]);

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
                            <InputError message={errors[`email`]} className="mt-2" />
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
                                    
                                />
                                <InputError message={errors[`senhaAtual`]} className="mt-2" />
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
                                    
                                />
                                <InputError message={errors[`novaSenha`]} className="mt-2" />
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
                                
                                />
                                <InputError message={errors[`confirmacaoNovaSenha`]} className="mt-2" />
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
