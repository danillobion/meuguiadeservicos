import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import AbasPagina from '@/components/ui/AbasPagina';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Acesso({user}) 
{
    const { flash } = usePage().props;
    const [openConfirm, setOpenConfirm] = useState(false);
    
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

                            {/* <button
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
                            </div> */}
                            <div className='flex justify-end space-x-2'>
                                <Link
                                    href={route('apresentacao.index')}
                                    className="inline-flex items-center px-8 py-4 text-md font-medium text-center text-black bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </Link>
                                <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                                    <AlertDialogTrigger
                                        type="button"
                                        className="shadow-md inline-flex items-center px-8 py-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    >
                                        {processing ? 'Processando...' : 'Salvar'}
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Deseja salvar?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Essa ação poderá ser alterada posteriormente caso seja necessário.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction
                                                type="button"
                                                disabled={processing}
                                                onClick={() => {
                                                    setOpenConfirm(false);
                                                    handleSubmit(new Event('submit'));
                                                }}
                                            >
                                                {processing ? 'Processando...' : 'Sim, quero salvar!'}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </MenuSuperior>
    );
}
