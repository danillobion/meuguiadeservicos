import AbasPagina from '@/Components/ui/AbasPagina';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head } from '@inertiajs/react';
import ServicoOuEstabelecimentoForm from '@/Components/form/ServicoOuEstabelecimentoForm';

export default function Page({ catalogo, tagServicos }) 
{
    let cabecalho = {};
    if(catalogo.tipo == "EST"){
        cabecalho = {
            titulo: "Estabelecimento",
            migalhas: [
                { href: "/", label: "Inicio" },
                { href: "/estabelecimento", label: "Estabelecimentos" },
                { href: "#", label: "Cadastro" },
            ],
        };
    }else{
        cabecalho = {
            titulo: "Serviço",
            migalhas: [
                { href: "/", label: "Inicio" },
                { href: "/servico", label: "Serviços" },
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
                        <ServicoOuEstabelecimentoForm catalogo={catalogo} tags={tagServicos} />
                    </div>
                </div>
            </div>
        </MenuSuperior>
    );
}
