import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Link, Head, useForm, usePage } from '@inertiajs/react';
import { AlertCircleIcon, Search, Terminal } from 'lucide-react';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import InputError from '@/components/InputError';
import { useEffect } from 'react';

export default function Cadastro({ tipos, tagServicos, tagEstabelecimentos }) {

  const { flash } = usePage().props;
  
  const cabecalho = {
    titulo: 'Cadastre-se',
    migalhas: [
      { href: '/', label: 'Inicio' },
      { href: '#', label: 'Cadastre-se' },
    ],
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    id: '',
    nome_completo: '',
    email_login: '',
    senha: '',
    confirmacao_senha: '',
    novo_usuario: true,
  });

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    post(route('catalogo.store'), {
      onSuccess: () => {
      },
      onError: () => {
        toast.error("Erro ao cadastrar.");
      }
    });
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
    <MenuSuperior>
      <Head title="Cadastro" />
      <div className="pr-3 pl-3 mx-auto max-w-3xl sm:px-6 lg:px-8 pb-12">
        <CabecalhoPagina cabecalho={cabecalho} />
        <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            <Alert className="bg-blue-50 text-blue-800">
              <AlertCircleIcon className='size-5' />
              <AlertTitle>O cadastro é rápido, fácil e gratuito!</AlertTitle>
              <AlertDescription>
                <p>Preencha os campos abaixo para acessar a plataforma.</p>
              </AlertDescription>
            </Alert>

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
              <InputError message={errors.nome_completo} className="mt-2" />
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
              <InputError message={errors.email_login} className="mt-2" />
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
              <InputError message={errors.senha} className="mt-2" />
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
              <InputError message={errors.confirmacao_senha} className="mt-2" />
            </div>

            <div className='flex justify-end space-x-2'>
              <div className="">
                <Link
                  href={route('apresentacao.index')}
                  className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-black bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </Link>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="shadow-md inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                {processing ? 'Processando...' : 'Salvar'}
              </button>
            </div>

          </form>
        </div>

        <div className="text-center mt-4 text-gray-500 text-sm">
          <span>
            Ao clicar em "Salvar", você concorda com os{' '}
            <a href="/termos-de-uso-e-privacidade" className="text-blue-500 hover:text-blue-700">Termos e Condições</a> e{' '}
            <a href="/termos-de-uso-e-privacidade" className="text-blue-500 hover:text-blue-700">Política de Privacidade</a>.
          </span>
        </div>
      </div>
    </MenuSuperior>
  );
}