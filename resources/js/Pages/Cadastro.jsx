import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Link, Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import { toast } from "sonner"
import axios from 'axios';

export default function Cadastro({ tipos, tagServicos, tagEstabelecimentos }) {
  const cabecalho = {
    titulo: "Cadastre-se",
    migalhas: [
      { href: "/", label: "Inicio" },
      { href: "#", label: "Cadastre-se" },
    ],
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    nome: '',
    email: '',
    senha: '',
    confirmacao_senha: '',
    nome_estabelecimento: '',
    descricao: '',
    tipo: '',
    telefone: '',
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    habilidades: [],
  });

  const selectRef = useRef(null);
  const [tagHabilidades, setTagHabilidades] = useState([]);

  useEffect(() => {
    setTagHabilidades([]);
    resetSelect();
    setData('habilidades', []);
    if(data.tipo === 'SEV') {
      setTagHabilidades(tagServicos);
    } else if(data.tipo === 'EST') {
      setTagHabilidades(tagEstabelecimentos);       
    }
  }, [data.tipo]);

  const handleCep = async (cep) => {
    try {
      const responde = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = responde.data;
      setData('uf', data.uf);
      setData('cidade', data.localidade);
      setData('bairro', data.bairro);
      setData('logradouro', data.logradouro);
      setData('complemento', data.complemento);
      toast.success("CEP encontrado com sucesso.");
    } catch (error) {
      toast.error("CEP inválido.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('catalogo.store'));
  };

  const resetSelect = () => {
    if (selectRef.current) {
      // react-select tem método clearValue() que limpa seleção
      selectRef.current.clearValue();
    }
  }

  return (
    <MenuSuperior>
      <Head title="Cadastro" />
      <div className="mx-auto max-w-2xl sm:px-6 lg:px-8 pb-12">
        <CabecalhoPagina cabecalho={cabecalho} />
        <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-6">
          <h2 className="text-2xl text-gray-600 mb-4">Informações</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <InputLabel htmlFor="nome" value="Nome e sobrenome" />
              <TextInput
                id="nome"
                type="text"
                name="nome"
                value={data.nome}
                onChange={e => setData('nome', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="nome"
                placeholder="Digite seu nome e sobrenome"
                required
              />
              {errors.nome && <div className="text-red-600 text-sm">{errors.nome}</div>}
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <InputLabel htmlFor="tipo" value="Tipo" />
              <SelectInput
                id="tipo"
                name="tipo"
                value={data.tipo}
                onChange={e => setData('tipo', e.target.value)}
                required
              >
                <option value="">Selecione o tipo</option>
                {tipos.map(tipoItem => (
                  <option key={tipoItem.value} value={tipoItem.value}>
                    {tipoItem.label}
                  </option>
                ))}
              </SelectInput>
              {errors.tipo && <div className="text-red-600 text-sm">{errors.tipo}</div>}
            </div>

            {/* Nome Estabelecimento - só se for EST */}
            {data.tipo === "EST" && (
              <div className="space-y-2">
                <InputLabel htmlFor="nome_estabelecimento" value="Nome do estabelecimento" />
                <TextInput
                  id="nome_estabelecimento"
                  type="text"
                  name="nome_estabelecimento"
                  value={data.nome_estabelecimento}
                  onChange={e => setData('nome_estabelecimento', e.target.value)}
                  className="mt-1 block w-full"
                  autoComplete="nome_estabelecimento"
                  placeholder="Digite o nome do seu estabelecimento"
                  required
                />
                {errors.nome_estabelecimento && <div className="text-red-600 text-sm">{errors.nome_estabelecimento}</div>}
              </div>
            )}

            {/* Habilidades - usando react-select */}
            {data.tipo && (
              <div className="space-y-2">
                <InputLabel htmlFor="habilidades" value="Habilidades" />
                <Select 
                  ref={selectRef}
                  options={tagHabilidades} 
                  isMulti 
                  value={data.habilidades}
                  onChange={(e) => setData('habilidades', e)}
                  placeholder="Selecione uma ou mais habilidades"
                  required
                />
                {errors.habilidades && <div className="text-red-600 text-sm">{errors.habilidades}</div>}
              </div>
            )}

            {/* Descrição - se tiver tipo */}
            {data.tipo && (
              <div className="space-y-2">
                <InputLabel htmlFor="descricao" value="Descrição" />
                <TextInput
                  id="descricao"
                  type="text"
                  name="descricao"
                  value={data.descricao}
                  onChange={e => setData('descricao', e.target.value)}
                  className="mt-1 block w-full"
                  autoComplete="descricao"
                  placeholder="Faça uma descrição do seu serviço ou estabelecimento"
                  required
                />
                {errors.descricao && <div className="text-red-600 text-sm">{errors.descricao}</div>}
              </div>
            )}

            {/* Contato */}
            <>
              <h1 className="text-2xl text-gray-600">Contato</h1>
              <div className="space-y-2">
                <InputLabel htmlFor="telefone" value="Telefone" />
                <div className="flex gap-3">
                  <TextInput
                    id="telefone"
                    type="text"
                    name="telefone"
                    value={data.telefone}
                    onChange={e => setData('telefone', e.target.value)}
                    className="flex-1"
                    autoComplete="telefone"
                    placeholder="Digite um telefone"
                    required
                  />
                </div>
                {errors.telefone && <div className="text-red-600 text-sm">{errors.telefone}</div>}
              </div>
              <span className='text-red-400 text-sm'>Atenção ao telefone, ele será usado para contato</span>
            </>

            {/* Endereço - se tiver tipo */}
            {data.tipo && (
              <>
                <h1 className="text-2xl text-gray-600">Endereço</h1>

                <div className="space-y-2">
                  <InputLabel htmlFor="cep" value="CEP" />
                  <div className="flex gap-3">
                    <TextInput
                      id="cep"
                      type="text"
                      name="cep"
                      value={data.cep}
                      onChange={e => setData('cep', e.target.value)}
                      className="flex-1"
                      autoComplete="cep"
                      placeholder="Digite o CEP"
                      required
                    />
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded flex items-center gap-2"
                      onClick={() => {
                        handleCep(data.cep);
                      }}
                    >
                      <Search /> Pesquisar
                    </button>
                  </div>
                  {errors.cep && <div className="text-red-600 text-sm">{errors.cep}</div>}
                </div>

                {[
                  { id: 'uf', label: 'UF', placeholder: 'Digite a UF' },
                  { id: 'cidade', label: 'Cidade', placeholder: 'Digite a cidade' },
                  { id: 'bairro', label: 'Bairro', placeholder: 'Digite o bairro' },
                  { id: 'logradouro', label: 'Logradouro', placeholder: 'Digite o logradouro' },
                ].map(({ id, label, placeholder }) => (
                  <div key={id} className="space-y-2">
                    <InputLabel htmlFor={id} value={label} />
                    <TextInput
                      id={id}
                      type="text"
                      name={id}
                      value={data[id]}
                      onChange={e => setData(id, e.target.value)}
                      className="mt-1 block w-full"
                      autoComplete={id}
                      placeholder={placeholder}
                      required
                      disabled
                    />
                    {errors[id] && <div className="text-red-600 text-sm">{errors[id]}</div>}
                  </div>
                ))}
                <div className="space-y-2">
                  <InputLabel htmlFor="complemento" value="Complemento" />
                  <TextInput
                    id="complemento"
                    type="text"
                    name="complemento"
                    value={data.complemento}
                    onChange={e => setData('complemento', e.target.value)}
                    className="mt-1 block w-full"
                    autoComplete="complemento"
                    placeholder="Digite o complemento"
                  />
                  {errors.complemento && <div className="text-red-600 text-sm">{errors.complemento}</div>}
                </div>

                <div className="space-y-2">
                  <InputLabel htmlFor="numero" value="Número" />
                  <TextInput
                    id="numero"
                    type="text"
                    name="numero"
                    value={data.numero}
                    onChange={e => setData('numero', e.target.value)}
                    className="mt-1 block w-full"
                    autoComplete="numero"
                    placeholder="Digite o número"
                    required
                  />
                  {errors.numero && <div className="text-red-600 text-sm">{errors.numero}</div>}
                </div>
              </>
            )}

            {/* Acesso */}
            <h1 className="text-2xl text-gray-600">Acesso</h1>

            <div className="space-y-2">
              <InputLabel htmlFor="email" value="E-mail" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="email"
                placeholder="Digite o e-mail"
                required
              />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>

            <div className="space-y-2">
              <InputLabel htmlFor="senha" value="Senha" />
              <TextInput
                id="senha"
                type="password"
                name="senha"
                value={data.senha}
                onChange={e => setData('senha', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Digite a senha"
                required
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
                onChange={e => setData('confirmacao_senha', e.target.value)}
                className="mt-1 block w-full"
                autoComplete="new-password"
                placeholder="Confirme a senha"
                required
              />
              {errors.confirmacao_senha && <div className="text-red-600 text-sm">{errors.confirmacao_senha}</div>}
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
