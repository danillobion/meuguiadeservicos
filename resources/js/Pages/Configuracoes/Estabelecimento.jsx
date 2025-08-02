// import InputLabel from '@/components/InputLabel';
// import SelectInput from '@/components/SelectInput';
// import TextInput from '@/components/TextInput';
// import AbasPagina from '@/components/ui/AbasPagina';
// import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
// import MenuSuperior from '@/Layouts/MenuSuperior';
// import { formatarCep } from '@/utils/formatarCEP';
// import { formatarTelefone } from '@/utils/formatarTelefone';
// import Select from 'react-select';
// import { Head, useForm, Link } from '@inertiajs/react';
// import { Search } from 'lucide-react';
// import { useEffect, useState, selectRef } from 'react';
// import TextAreaInput from '@/components/TextAreaInput';
// import ServicoOuEstabelecimentoForm from '@/components/form/ServicoOuEstabelecimentoForm';

// export default function Estabelecimento({catalogo, tagEstabelecimentos}) 
// {
//     const cabecalho = {
//         titulo: "Configurações: Estabelecimento",
//         migalhas: [
//             { href: "/", label: "Inicio" },
//             { href: "/configuracoes/meus-dados", label: "Configurações" },
//             { href: "/configuracoes/estabelecimento", label: "Estabelecimento" },
//         ],
//     };

//     const abas = [
//         { href: "/configuracoes/meus-dados", label: "Meus dados" },
//         { href: "/configuracoes/servico", label: "Serviço" },
//         { href: "/configuracoes/estabelecimento", label: "Estabelecimento", active: true },
//         { href: "/configuracoes/acesso", label: "Acesso" },
//     ]

//     return (
//         <MenuSuperior>
//             <Head title={cabecalho.titulo} />
//             <div className="pr-3 pl-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

//                 <CabecalhoPagina cabecalho={cabecalho} />
//                 <AbasPagina cabecalho={abas} />

//                 <div className="overflow-hidden bg-white shadow-lg rounded-lg rounded-tl-none z-10">
//                     <div className="p-6 text-gray-900">
//                         <ServicoOuEstabelecimentoForm catalogo={catalogo} tags={tagEstabelecimentos} />
//                     </div>
//                 </div>
//             </div>
//         </MenuSuperior>
//     );
// }
