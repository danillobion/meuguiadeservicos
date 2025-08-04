import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
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
import axios from 'axios';
import { AlertCircleIcon, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function List({ catalogo,tipo,credito }) 
{
    const { flash } = usePage().props;
    const [openConfirmId, setOpenConfirmId] = useState(null);
    
    const cabecalho = {
        titulo: tipo == "EST" ? "Meus Estabelecimentos" : "Meus Serviços",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: tipo == "EST" ? "/catalogo/estabelecimentos/listar" : "/catalogo/servicos/listar", label: tipo == "EST" ? "Meus Estabelecimentos" : "Meus Serviços" },
        ],
        aviso:{
            titulo:"Crédito",
            mensagem:credito?.mensagem
        }
    };

    const handleDeletar = (id) => {
        axios.delete(route('catalogo.deletar', { id }))
            .then((response) => {
                toast.success(response.data.message);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Erro ao deletar item.');
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

                <div className="overflow-hidden bg-white shadow-lg rounded-lg z-10">
                    <div className="text-gray-900">

                        <div className="relative overflow-x-auto">
                            {/* Nome */}
                            <div className="space-y-2 flex justify-between p-6">
                                <h1 className="text-2xl text-gray-600 flex items-center">{tipo == "EST" ? "Estabelecimentos" : "Serviços"}</h1>

                                {credito?.credito != 0 ? (
                                    <Link
                                        href={route(tipo == "EST" ? "estabelecimento.editar" : "servico.editar", { id: 0 })}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md text-md shadow"
                                    >
                                        {tipo == "EST" ? "Novo Estabelecimento" : "Novo Serviço"}
                                    </Link>
                                    ) : (
                                    <span className="bg-gray-300 text-gray-500 font-bold px-4 py-2 rounded-md text-md shadow cursor-not-allowed">
                                        {tipo == "EST" ? "Novo Estabelecimento" : "Novo Serviço"}
                                    </span>
                                )}
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Descrição
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {catalogo && catalogo.map((item) => (
                                        <tr className="bg-white border-b border-gray-200"
                                            key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {item.nome}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.descricao}
                                            </td>
                                            <td className="px-6 py-4 md:space-x-1 space-y-2">
                                            <Link
                                                href={tipo == "EST" ? route("estabelecimento.editar", { id: item.id }) : route("servico.editar", { id: item.id })}
                                                className="bg-gray-200 hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-md"
                                            >
                                                Editar
                                            </Link>
                                            
                                                <AlertDialog open={openConfirmId === item.id} onOpenChange={(isOpen) => {
                                                    if (!isOpen) {
                                                    setOpenConfirmId(null);
                                                    }
                                                }}>
                                                    <AlertDialogTrigger
                                                    type="button"
                                                    className="bg-gray-200 hover:bg-gray-300 text-red-600 font-bold px-4 py-2 rounded-md"
                                                    onClick={() => setOpenConfirmId(item.id)}
                                                    >
                                                    Deletar
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Deseja deletar: <b>{item.nome}</b>?</AlertDialogTitle>
                                                        <AlertDialogDescription>Essa ação não pode ser desfeita</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setOpenConfirmId(null)}>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
                                                            onClick={() => {
                                                                setOpenConfirmId(null);
                                                                handleDeletar(item.id);
                                                            }}
                                                        >
                                                        Sim, quero deletar!
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </td>
                                        </tr>
                                    ))}
                                    {catalogo.length === 0 && (
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nenhum {tipo == "SER" ? "serviço" : "estabelecimento"} encontrado.
                                            </th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
