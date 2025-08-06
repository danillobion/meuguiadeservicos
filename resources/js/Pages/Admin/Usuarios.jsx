import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head} from '@inertiajs/react';
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
import { EditarCredito } from '@/components/Dialog/EditarCredito';

export default function Usuarios() 
{
    const [usuarios, setUsuarios] = useState([]);
    const [openConfirmId, setOpenConfirmId] = useState(null);

    const cabecalho = {
        titulo: "Usuários",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/admin/usuarios", label: "Usuários" },
        ],
    };

    const findAll = () => {
        axios.get(route('admin.usuarios.find-all'))
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Erro ao buscar lista de usuários.');
            });
    };

    const handleSalvarCredito = (dados) => {
        axios.post(route('admin.usuarios.alterar-credito'), {
            usuario_id: dados.id,
            quantidade_servico: dados.quantidade_servico,
            quantidade_estabelecimento: dados.quantidade_estabelecimento,
        })
        .then((response) => {
                const novoPlano = response.data;
                setUsuarios(prev =>
                    prev.map(user =>
                        user.id === dados.id
                            ? {
                                ...user,
                                plano: {
                                    ...user.plano,
                                    ...novoPlano, 
                                },
                            }
                            : user
                    )
                );
            })
        .catch((error) => {
            toast.error(error.response?.data?.message || 'Erro ao atualizar o status.');
        });
    };

    const alterarStatus = (usuario_id) => {
        axios.get(route('admin.usuarios.alterar-status', { id: usuario_id }))
        .then((response) => {
            usuarios.map((item) => {
                if (item.id == usuario_id) {
                    item.status = response.data.status;
                }
            })
            setUsuarios([...usuarios]);
        })
        .catch((error) => {
            toast.error(error.response?.data?.message || 'Erro ao atualizar o status.');
        });
    };

    useEffect(() => {
        findAll();
    }, []);

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />
            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

                <CabecalhoPagina cabecalho={cabecalho} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg rounded-tl-none z-10">
                    <div className="text-gray-900 overflow-x-auto w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-md text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            E-mail
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Crédito: Serviços
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Crédito: Estabelecimentos
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {usuarios && usuarios.map((item) => (
                                        <tr className="bg-white border-b border-gray-200"
                                            key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.quantidade_servico_cadastrado}/{item.plano.num_servicos}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.quantidade_estabelecimento_cadastrado}/{item.plano.num_estabelecimentos}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status ? (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Ativo</span>
                                                ) : (
                                                    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">Bloqueado</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 space-x-2 space-y-2">

                                                <EditarCredito 
                                                    item={item} 
                                                    quantidade_servico={item.plano.num_servicos}
                                                    quantidade_estabelecimento={item.plano.num_estabelecimentos}
                                                    onSalvar={handleSalvarCredito} 
                                                />
                                            
                                                <AlertDialog open={openConfirmId === item.id} onOpenChange={(isOpen) => {
                                                    if (!isOpen) {
                                                    setOpenConfirmId(null);
                                                    }
                                                }}>
                                                    <AlertDialogTrigger
                                                        type="button"
                                                        className={item.status ? "bg-gray-200 hover:bg-gray-300 text-red-600 font-bold px-4 py-2 rounded-md" : "bg-gray-200 hover:bg-gray-300 text-green-600 font-bold px-4 py-2 rounded-md"}
                                                        onClick={() => setOpenConfirmId(item.id)}
                                                        >
                                                        {item.status ? 'Bloquear' : 'Desbloquear'}
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Deseja {item.status ? 'bloquear' : 'desbloquear'} <b>{item.name}</b>?</AlertDialogTitle>
                                                        <AlertDialogDescription>Essa ação pode ser desfeita</AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setOpenConfirmId(null)}>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                          className={!item.status ? "bg-green-600 hover:bg-green-700 text-white font-green px-4 py-2 rounded-md" : "bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"}
                                                            onClick={() => {
                                                                setOpenConfirmId(null);
                                                                alterarStatus(item.id);
                                                            }}
                                                        >
                                                        {item.status ? 'Sim, quero bloquear!' : 'Sim, quero desbloquear!'}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </td>
                                        </tr>
                                    ))}
                                    {usuarios.length === 0 && (
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nenhum usuário encontrado.
                                            </th>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
