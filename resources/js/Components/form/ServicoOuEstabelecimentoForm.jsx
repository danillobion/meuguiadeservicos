import { formatarCep } from "@/utils/formatarCEP";
import { useForm,Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import TextAreaInput from "../TextAreaInput";
import Select from 'react-select';
import { Search } from "lucide-react";
import { toast } from "sonner"
import { formatarTelefone } from "@/utils/formatarTelefone";

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
import InputError from "../InputError";

export default function ServicoOuEstabelecimentoForm({ catalogo, tags, tipo }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
            id: catalogo?.id || '',
            nome: catalogo?.nome || '',
            descricao: catalogo?.descricao || '',
            habilidades: catalogo?.tags?.map(tag => ({ value: tag.id, label: tag.nome })) || [],
            tipo: catalogo?.tipo || tipo,
            endereco: {
                id: catalogo?.endereco?.id || '',
                cep: formatarCep(catalogo?.endereco?.cep) || '',
                uf: catalogo?.endereco?.uf || '',
                cidade: catalogo?.endereco?.cidade || '',
                bairro: catalogo?.endereco?.bairro || '',
                logradouro: catalogo?.endereco?.logradouro || '',
                complemento: catalogo?.endereco?.complemento || '',
                numero: catalogo?.endereco?.numero || '',
            },
            contato: {
                id: catalogo?.contato?.id || '',
                telefone: catalogo?.contato?.telefone || '',
                email: catalogo?.contato?.email || '',
                whatsapp: catalogo?.contato?.whatsapp || '',
                telegram: catalogo?.contato?.telegram || '',
                site: catalogo?.contato?.site || '',
                facebook: catalogo?.contato?.facebook || '',
                instagram: catalogo?.contato?.instagram || ''
            }
        });
        const tagsFormatada = tags;
        const [tagHabilidades, setTagHabilidades] = useState(tagsFormatada);
        const [openConfirm, setOpenConfirm] = useState(false);
    
        const handleSubmit = async (e) => {
            if (e?.preventDefault) e.preventDefault();
                post(route('catalogo.salvar'), {
                    onSuccess: () => {
                        // Nada a fazer aqui — o backend já está redirecionando
                    },
                    onError: () => {
                        toast.error("Erro ao cadastrar.");
                    }
                });
        };
    
    const handleCep = async (cep) => {
        cep = cep.replace(/\D/g, '');
        if(cep.length < 8){
            toast.error('CEP inválido');
            return
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
            if(response.ok) {
                toast.success('CEP encontrado com sucesso.');
            }
            if (!response.ok) throw new Error('Erro ao buscar CEP');
            const endereco = await response.json();
            if (endereco.erro) throw new Error('CEP não encontrado');
            setData('endereco', {
                ...data.endereco,
                cep: endereco.cep,
                uf: endereco.uf,
                cidade: endereco.localidade,
                bairro: endereco.bairro,
                logradouro: endereco.logradouro,
            });
        } catch (error) {
            toast.error(error.message);
        }
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
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl text-gray-600">Informações</h1>
                {/* Nome */}
                <div className="space-y-2">
                    <InputLabel htmlFor="nome" value={data.tipo === "SER" ? "Nome para o serviço" : "Nome do estabelecimento"} />
                    <TextInput
                        id="nome"
                        type="text"
                        name="nome"
                        value={data.nome}
                        onChange={e => setData('nome', e.target.value)}
                        className="mt-1 block w-full py-4 text-2xl"
                        placeholder={data.tipo === "SER" ? "Nome para o serviço" : "Nome do estabelecimento"}
                    />
                    <InputError message={errors[`nome`]} className="mt-2" />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                    <InputLabel htmlFor="descricao" value="Descrição" />
                    <TextAreaInput
                        id="descricao"
                        name="descricao"
                        value={data.descricao}
                        onChange={e => setData('descricao', e.target.value)}
                        className="mt-1 block w-full py-4 text-2xl"
                        placeholder="Descreva seu serviço"
                    />
                    <InputError message={errors.descricao} className="mt-2" />
                </div>

                {/* Habilidades */}
                <div className="space-y-2">
                    <InputLabel htmlFor="habilidades" value="Habilidades" />
                    <Select
                        options={tagHabilidades}
                        isMulti
                        value={data.habilidades}
                        onChange={(e) => setData('habilidades', e)}
                        placeholder="Selecione as habilidades"
                        className='mt-1 block w-full text-xl'
                    />
                    <InputError message={errors.habilidades} className="mt-2" />
                </div>

                {/* Contato */}
                <h1 className="text-2xl text-gray-600">Contato</h1>
                <div className="space-y-2">
                    <InputLabel htmlFor="telefone" value="Telefone" />
                    <TextInput
                        id="telefone"
                        type="text"
                        name="telefone"
                        value={data.contato.telefone || ''}
                        onChange={e => setData('contato', { ...data.contato, telefone: formatarTelefone(e.target.value) })}
                        className="mt-1 block w-full py-4 pr-4 text-2xl"
                        autoComplete="telefone"
                        placeholder="Digite o número de telefone"
                    />
                    <InputError message={errors['contato.telefone']} className="mt-2" />
                </div>
                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="E-mail" />
                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.contato.email || ''}
                        onChange={e => setData('contato', { ...data.contato, email: e.target.value })}                        
                        className="mt-1 block w-full py-4 pr-4 text-2xl"
                        autoComplete="email"
                        placeholder="Digite o e-mail"
                    />
                    <InputError message={errors['contato.email']} className="mt-2" />
                </div>
                <div className="space-y-2">
                    <InputLabel htmlFor="site" value="Site" />
                    <TextInput
                        id="site"
                        type="text"
                        name="site"
                        value={data.contato.site || ''}
                        onChange={e => setData('contato', { ...data.contato, site: e.target.value })}
                        className="mt-1 block w-full py-4 pr-4 text-2xl"
                        autoComplete="site"
                        placeholder="Digite o link do site"
                    />
                    <InputError message={errors['contato.site']} className="mt-2" />
                </div>

                {/* Endereço */}
                <h1 className="text-2xl text-gray-600">Endereço</h1>
                <div className="space-y-2 flex w-1/2">
                    <div className="w-full">
                        <InputLabel htmlFor="cep" value="CEP" />
                        <div className="flex gap-3">
                            <TextInput
                                id="cep"
                                type="text"
                                name="cep"
                                value={data.endereco.cep}
                                onChange={e => setData('endereco', { ...data.endereco, cep: formatarCep(e.target.value) })}
                                className="flex-1 mt-1 block w-full py-4 text-2xl"
                                placeholder="Digite o CEP"
                            />
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center gap-2 text-xl"
                                onClick={() => handleCep(data.endereco.cep)}
                            >
                                <Search /> Pesquisar
                            </button>
                        </div>
                        <InputError message={errors['endereco.cep']} className="mt-2" />
                    </div>
                </div>

                {/* Restante dos campos de endereço */}
                {['uf', 'cidade', 'bairro', 'logradouro', 'complemento', 'numero'].map((campo) => (
                    <div key={campo} className="space-y-2">
                        <InputLabel htmlFor={campo} value={campo.charAt(0).toUpperCase() + campo.slice(1)} />
                        <TextInput
                            id={campo}
                            type="text"
                            name={campo}
                            value={data.endereco[campo]}
                            onChange={e => setData('endereco', { ...data.endereco, [campo]: e.target.value })}
                            className="flex-1 mt-1 block w-full py-4 text-2xl"
                            placeholder={`Digite o ${campo}`}
                            disabled={['uf', 'cidade', 'bairro', 'logradouro'].includes(campo)}
                        />
                        <InputError
                            message={errors[`endereco.${campo}`]?.replace('endereco.', '')}
                            className="mt-2"
                        />                    
                    </div>
                ))}

                <div className='flex justify-end space-x-2 pt-5'>
                    <Link
                        href={data.tipo === "SER" ? route('servico.listar') : route('estabelecimento.listar')}
                        className="inline-flex items-center px-8 py-4 text-md font-medium text-center text-black bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                    <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                        <AlertDialogTrigger
                            type="button"
                            className="shadow-md inline-flex items-center px-8 py-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Salvar
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
                                    onClick={() => {
                                        setOpenConfirm(false);
                                        handleSubmit(new Event('submit'));
                                    }}
                                >
                                    Sim, quero salvar!
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>              
            </form>
        </>
    );
}