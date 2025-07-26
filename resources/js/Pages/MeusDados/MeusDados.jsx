import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { formatarTelefone } from '@/utils/formatarTelefone';
import { toast } from "sonner"
import InputError from '@/Components/InputError';
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

                            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                                <AlertDialogTrigger
                                    type="button"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded w-full text-lg shadow"
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
