import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import AbasPagina from '@/components/ui/AbasPagina';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { formatarTelefone } from '@/utils/formatarTelefone';
import { toast } from "sonner"
import InputError from '@/components/InputError';
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

export default function MeusDados({user}) 
{
    const { flash } = usePage().props;
    const [openConfirm, setOpenConfirm] = useState(false);
    
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

    const { data, setData, post, processing, errors } = useForm({
        id: '',
        nome: '',
        telefone: '',
        tipo: 'meusDados',
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
                                <InputError message={errors[`nome`]} className="mt-2" />
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
                            <InputError message={errors[`telefone`]} className="mt-2" />
                            </div>


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
