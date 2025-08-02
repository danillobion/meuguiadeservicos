import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import AbasPagina from '@/components/ui/AbasPagina';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { formatarCep } from '@/utils/formatarCEP';
import { formatarTelefone } from '@/utils/formatarTelefone';
import Select from 'react-select';
import { Head, useForm, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState, selectRef } from 'react';
import TextAreaInput from '@/components/TextAreaInput';
import ServicoOuEstabelecimentoForm from '@/components/form/ServicoOuEstabelecimentoForm';

export default function Catalogo() 
{
    const [catalogo, setCatalogo] = useState([]);

    const cabecalho = {
        titulo: "Catalogo",
        migalhas: [
            { href: "/", label: "Inicio" },
            { href: "/admin/catalogo", label: "Catalogo" },
        ],
    };

    const findAll = () => {
        axios.get(route('admin.catalogos.find-all'))
            .then((response) => {
                setCatalogo(response.data);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || 'Erro ao buscar catalogo.');
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

                <div className="overflow-hidden bg-white shadow-lg rounded-lg z-10">
                    <div className="text-gray-900 overflow-x-auto w-full">
                        <div className='flex justify-end p-6'>
                            {/* <EditarTag 
                                item={null} 
                                onSalvar={handleSalvarTag}
                            /> */}
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-md text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Cidade/UF
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Data de criação
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            Ações
                                        </th> */}
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
                                                {item.endereco.cidade}/{item.endereco.uf}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.tipo === "SER" ? (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Serviço</span>
                                                ) : (
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Estabelecimento</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.created_at_formatado}
                                            </td>
                                            <td>
                                                {/* <EditarTag 
                                                    item={item} 
                                                    onSalvar={handleSalvarTag} 
                                                /> */}
                                            </td>
                                        </tr>
                                    ))}
                                    {catalogo.length === 0 && (
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nenhuma catalogo encontrado.
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
