import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { EditarTag } from '@/components/Dialog/EditarTag';
import { toast } from 'sonner';

export default function Tag() 
{
    const [tag, setTag] = useState([]);

    const cabecalho = {
        titulo: "Tags",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/admin/tags", label: "Tags" },
        ],
    };

    const findAll = () => {
        axios.get(route('admin.tags.find-all'))
            .then((response) => {
                setTag(response.data);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Erro ao buscar lista de tags.');
            });
    };

    const handleSalvarTag = (dadosTag) => {
        if (dadosTag.id) {
            // Edição
            axios.put(route('admin.tags.atualizar', { id: dadosTag.id }), dadosTag)
                .then((response) => {
                    const tagAtualizada = response.data;
                    setTag((prev) =>
                        prev.map((t) => (t.id === tagAtualizada.id ? tagAtualizada : t))
                    );
                    toast.success("Tag atualizada com sucesso");
                })
                .catch(() => toast.error("Erro ao atualizar tag"));
        } else {
            // Criação
            axios.post(route('admin.tags.salvar'), dadosTag)
                .then((response) => {
                    const novaTag = response.data;
                    setTag((prev) => [...prev, novaTag]);
                    toast.success("Tag criada com sucesso");
                })
                .catch(() => toast.error("Erro ao criar tag"));
        }
    };

    useEffect(() => {
        findAll();
    }, []);

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />
            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

                <CabecalhoPagina cabecalho={cabecalho} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg z-10">
                    <div className="text-gray-900 overflow-x-auto w-full">
                        <div className='flex justify-end p-6'>
                            <EditarTag 
                                item={null} 
                                onSalvar={handleSalvarTag}
                            />
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-md text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {tag && tag.map((item) => (
                                        <tr className="bg-white border-b border-gray-200"
                                            key={item.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {item.nome}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.tipo === "SER" ? (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Serviço</span>
                                                ) : (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Estabelecimento</span>
                                                )}
                                            </td>
                                            <td>
                                                <EditarTag 
                                                    item={item} 
                                                    onSalvar={handleSalvarTag} 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {tag.length === 0 && (
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nenhuma tag encontrada.
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
