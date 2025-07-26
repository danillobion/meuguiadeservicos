import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Link, Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { AlertCircleIcon, Search, Terminal } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import { toast } from 'sonner';
import axios from 'axios';
import { formatarTelefone } from '@/utils/formatarTelefone';
import { formatarCep } from '@/utils/formatarCEP';
import TextAreaInput from '@/Components/TextAreaInput';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import InputError from '@/Components/InputError';

export default function Cadastro({ tipos, tagServicos, tagEstabelecimentos }) {
  const cabecalho = {
    titulo: 'Cadastre-se',
    migalhas: [
      { href: '/', label: 'Inicio' },
      { href: '#', label: 'Cadastre-se' },
    ],
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    id: '',
    nome: '',
    descricao: '',
    habilidades: [],
    tipo: '',
    endereco: {
      id: '',
      cep: '',
      uf: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      complemento: '',
      numero: '',
    },
    contato: {
      id: '',
      telefone: '',
      email: '',
      whatsapp: '',
      telegram: '',
      site: '',
      facebook: '',
      instagram: '',
    },
    nome_completo: '',
    email_login: '',
    senha: '',
    confirmacao_senha: '',
    novo_usuario: true,
  });

  const selectRef = useRef(null);
  const [tagHabilidades, setTagHabilidades] = useState([]);

  useEffect(() => {
    setTagHabilidades([]);
    resetSelect();
    setData('habilidades', []);
    if (data.tipo === 'SEV') {
      setTagHabilidades(tagServicos);
    } else if (data.tipo === 'EST') {
      setTagHabilidades(tagEstabelecimentos);
    }
  }, [data.tipo]);

  const handleCep = async (cep) => {
    try {
      const responde = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const dataCep = responde.data;
      setData('endereco', {
        ...data.endereco,
        uf: dataCep.uf,
        cidade: dataCep.localidade,
        bairro: dataCep.bairro,
        logradouro: dataCep.logradouro,
        complemento: dataCep.complemento,
      });
      toast.success('CEP encontrado com sucesso.');
    } catch (error) {
      toast.error('CEP inválido.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("opa: ", e);

    post(route('catalogo.store'), {
      onSuccess: () => {
        // Nada a fazer aqui — o backend já está redirecionando
      },
      onError: () => {
        toast.error("Erro ao cadastrar.");
      }
    });
  };


  const resetSelect = () => {
    if (selectRef.current) {
      selectRef.current.clearValue();
    }
  };

  return (
    <MenuSuperior>
      <Head title="Cadastro" />
      <div className="pr-3 pl-3 mx-auto max-w-3xl sm:px-6 lg:px-8 pb-12">
        <CabecalhoPagina cabecalho={cabecalho} />
        <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-6">
          <h2 className="text-2xl text-gray-600 mb-4">Informações</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

            <Alert className="bg-blue-50 text-blue-800">
              <AlertCircleIcon className='size-5' />
              <AlertTitle>O cadastro é rápido, fácil e gratuito!</AlertTitle>
              <AlertDescription>
                <p>Preencha os campos abaixo para divulgar o seu serviço ou estabelecimento.</p>
              </AlertDescription>
            </Alert>

            {/* Tipo */}
            <div className="space-y-2">
              <InputLabel htmlFor="tipo" value="Tipo de divulgação"/>
              <SelectInput
                id="tipo"
                name="tipo"
                value={data.tipo}
                onChange={(e) => setData('tipo', e.target.value)}
                className="mt-1 block w-full pr-4 text-2xl text-gray-500 py-3"
              >
                <option value="">Selecione o tipo de divulgação</option>
                {tipos.map((tipoItem) => (
                  <option key={tipoItem.value} value={tipoItem.value}>
                    {tipoItem.label}
                  </option>
                ))}
              </SelectInput>
              <InputError message={errors.tipo} className="mt-2" />
            </div>

            {/* Nome */}
            {data.tipo && (
              <div className="space-y-2">
                <InputLabel
                  htmlFor="nome"
                  value={data.tipo === 'SEV' ? 'Nome do seu serviço' : 'Nome do seu estabelecimento'}
                />
                <TextInput
                  id="nome"
                  type="text"
                  name="nome"
                  value={data.nome}
                  onChange={(e) => setData('nome', e.target.value)}
                  className="mt-1 block w-full py-4 pr-4 text-2xl"
                  autoComplete="nome"
                  placeholder={
                    data.tipo === 'SEV'
                      ? 'Digite o nome do seu serviço'
                      : 'Digite o nome do seu estabelecimento'
                  }
                  
                />
                <span className='text-gray-500 text-sm'>
                  {data.tipo === 'SEV' ? 'Exemplo: Pintor de Parede, Serviços de Limpeza, etc' : ''}
                </span>
                {errors.nome && <div className="text-red-600 text-sm">{errors.nome}</div>}
              </div>
            )}

            {/* Habilidades */}
            {data.tipo && (
              <div className="space-y-2">
                <InputLabel htmlFor="habilidades" value={data.tipo === 'SEV' ? 'Habilidades do seu serviço' : 'Categorias do seu estabelecimento'} />
                <Select
                  ref={selectRef}
                  options={tagHabilidades}
                  isMulti
                  value={data.habilidades}
                  onChange={(e) => setData('habilidades', e)}
                  placeholder={
                    data.tipo === 'SEV'
                      ? 'Selecione as habilidades do seu serviço'
                      : 'Selecione as categorias do seu estabelecimento'
                  }
                  className="mt-1 block w-full text-2xl my-5"
                />
                <span className='text-gray-500 text-sm'>
                  {data.tipo === 'SEV' ? 'Exemplo: Pintor, Encanador, etc' : 'Exemplo: Restaurante, Bar, Hotel, etc'}
                </span>
                {errors.habilidades && <div className="text-red-600 text-sm">{errors.habilidades}</div>}
              </div>
            )}

            {/* Descrição */}
            {data.tipo && (
              <div className="space-y-2">
                <InputLabel htmlFor="descricao" value="Descrição" />
                <TextAreaInput
                  id="descricao"
                  name="descricao"
                  value={data.descricao}
                  onChange={(e) => setData('descricao', e.target.value)}
                  className="mt-1 block w-full py-4 pr-4 text-2xl"
                  autoComplete="descricao"
                  placeholder={
                    data.tipo === 'SEV'
                      ? 'Faça uma descrição do seu serviço'
                      : 'Faça uma descrição do seu estabelecimento'
                  }
                />
                {errors.descricao && <div className="text-red-600 text-sm">{errors.descricao}</div>}
              </div>
            )}

            {/* Contato */}
            {data.tipo && (
              <>
                <h1 className="text-2xl text-gray-600">Contato</h1>
                <div className="space-y-2">
                  <InputLabel htmlFor="telefone" value="Telefone" />
                  <TextInput
                    id="telefone"
                    type="text"
                    name="telefone"
                    value={data.contato.telefone}
                    onChange={(e) =>
                      setData('contato', {
                        ...data.contato,
                        telefone: formatarTelefone(e.target.value),
                      })
                    }
                    className="mt-1 block w-full py-4 pr-4 text-2xl"
                    autoComplete="tel"
                    placeholder="Digite o telefone"
                  />
                  {errors['contato.telefone'] && (
                    <div className="text-red-600 text-sm">{errors['contato.telefone']}</div>
                  )}
                </div>
              </>
            )}

            {/* Endereço */}
            {data.tipo && (
              <>
                <h1 className="text-2xl text-gray-600">Endereço</h1>
                <div className="space-y-2 flex">
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
                        {errors.endereco?.cep && <div className="text-red-600 text-sm">{errors.endereco.cep}</div>}
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
                            // required={campo !== 'complemento'}
                            disabled={['uf', 'cidade', 'bairro', 'logradouro'].includes(campo)}
                        />
                        {errors.endereco?.[campo] && <div className="text-red-600 text-sm">{errors.endereco[campo]}</div>}
                    </div>
                ))}
              </>
            )}

            {/* Acesso */}
            <h1 className="text-2xl text-gray-600">Acesso</h1>
            <div className="space-y-2">
              <InputLabel htmlFor="nome_completo" value="Nome completo" />
              <TextInput
                id="nome_completo"
                type="text"
                name="nome_completo"
                value={data.nome_completo}
                onChange={(e) => setData('nome_completo', e.target.value)}
                className="mt-1 block w-full py-4 pr-4 text-2xl"
                autoComplete="name"
                placeholder="Digite seu nome completo"
              />
              {errors.nome_completo && (
                <div className="text-red-600 text-sm">{errors.nome_completo}</div>
              )}
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="email_login" value="E-mail" />
              <TextInput
                id="email_login"
                type="email"
                name="email_login"
                value={data.email_login}
                onChange={(e) => setData('email_login', e.target.value)}
                className="mt-1 block w-full py-4 pr-4 text-2xl"
                autoComplete="email"
                placeholder="Digite seu e-mail"
              />
              {errors.email_login && (
                <div className="text-red-600 text-sm">{errors.email_login}</div>
              )}
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="senha" value="Senha" />
              <TextInput
                id="senha"
                type="password"
                name="senha"
                value={data.senha}
                onChange={(e) => setData('senha', e.target.value)}
                className="mt-1 block w-full py-4 pr-4 text-2xl"
                autoComplete="new-password"
                placeholder="Digite a senha"
              />
              {errors.senha && <div className="text-red-600 text-sm">{errors.senha}</div>}
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="confirmacao_senha" value="Confirmar Senha" />
              <TextInput
                id="confirmacao_senha"
                type="password"
                name="confirmacao_senha"
                value={data.confirmacao_senha}
                onChange={(e) => setData('confirmacao_senha', e.target.value)}
                className="mt-1 block w-full py-4 pr-4 text-2xl"
                autoComplete="new-password"
                placeholder="Confirme a senha"
              />
              {errors.confirmacao_senha && (
                <div className="text-red-600 text-sm">{errors.confirmacao_senha}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded w-full text-center text-lg shadow"
            >
              {processing ? 'Processando...' : 'Salvar'}
            </button>

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
        

        <div className="text-center mt-4 text-gray-500 text-sm">
          <span>
            Ao clicar em "Me cadastrar", você concorda com os{' '}
            <a href="#" className="text-blue-500 hover:text-blue-700">Termos e Condições</a> e{' '}
            <a href="#" className="text-blue-500 hover:text-blue-700">Política de Privacidade</a>.
          </span>
        </div>
      </div>
    </MenuSuperior>
  );
}