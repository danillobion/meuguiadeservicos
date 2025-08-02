import AbasPagina from '@/components/ui/AbasPagina';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';
import ServicoOuEstabelecimentoForm from '@/components/form/ServicoOuEstabelecimentoForm';

export default function Edit({ catalogo, tags, tipo }) 
{
    let cabecalho = {};
    if(tipo == "EST"){
        cabecalho = {
            titulo: catalogo === null ? "Novo Estabelecimento" : "Editar Estabelecimento",
            migalhas: [
                { href: "/", label: "Inicio" },
                { href: "/estabelecimento", label: "Estabelecimentos" },
                { href: "#", label: catalogo === null ? "Novo Estabelecimento" : "Editar Estabelecimento" },
            ],
        };
    }else{
        cabecalho = {
            titulo: catalogo === null ? "Novo Serviço" : "Editar Serviço",
            migalhas: [
                { href: "/", label: "Inicio" },
                { href: "/catalogo/servicos/listar", label: "Serviços" },
                { href: "#", label: catalogo === null ? "Novo Serviço" : "Editar Serviço" },
            ],
        };
    }

    return (
        <MenuSuperior>
            <Head title={cabecalho.titulo} />
            <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

                <CabecalhoPagina cabecalho={cabecalho} />

                <div className="overflow-hidden bg-white shadow-lg rounded-lg z-10">
                    <div className="p-6 text-gray-900">
                        <ServicoOuEstabelecimentoForm catalogo={catalogo} tags={tags} tipo={tipo} />
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
