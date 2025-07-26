import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Page({ estabelecimentos }) 
{
    const cabecalho = {
        titulo: "Estabelecimentos",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/estabelecimentos", label: "Estabelecimentos" },
        ],
    };

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
                                <h1 className="text-2xl text-gray-600 flex items-center">Estabelecimentos cadastrados</h1>
                                <Link
                                    href={`/estabelecimento/cadastro/null`}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md text-md shadow"
                                >
                                    Novo
                                </Link>
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

                                    {estabelecimentos && estabelecimentos.map((estabelecimento) => (
                                        <tr className="bg-white border-b border-gray-200"
                                            key={estabelecimento.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {estabelecimento.nome}
                                            </th>
                                            <td className="px-6 py-4">
                                                {estabelecimento.descricao}
                                            </td>
                                            <td className="px-6 py-4 space-x-2">
                                            <Link
                                                href={`/estabelecimento/cadastro/${estabelecimento.id}`}
                                                className="bg-gray-200 hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-md"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                className="bg-gray-200 hover:bg-gray-300 text-red-500 font-bold px-4 py-2 rounded-md"
                                            >
                                                Deletar
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {estabelecimentos.length === 0 && (
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nenhum estabelecimento cadastrado
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
