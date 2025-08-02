import InputLabel from '@/components/InputLabel';
import SelectInput from '@/components/SelectInput';
import TextInput from '@/components/TextInput';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Link, Head, useForm } from '@inertiajs/react';
import Select from 'react-select';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import { toast } from "sonner"
import axios from 'axios';

export default function Entrar({ tipos, tagServicos, tagEstabelecimentos }) {
  const cabecalho = {
    titulo: "Entrar",
    migalhas: [
      { href: "/", label: "Inicio" },
      { href: "#", label: "Entrar" },
    ],
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    senha: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('catalogo.store'));
  };

  return (
    <MenuSuperior>
      <Head title="Entrar" />
      <div className="pr-3 pl-3 mx-auto max-w-2xl sm:px-6 lg:px-8 pb-12">
        <CabecalhoPagina cabecalho={cabecalho} />
        <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-6">
          <h2 className="text-2xl text-gray-600 mb-4">Informações</h2>
          <form onSubmit={handleSubmit} className="space-y-4">

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

            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-4 rounded w-full text-center text-lg shadow"
            >
              {processing ? 'Processando...' : 'Entrar'}
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
        
      </div>
    </MenuSuperior>
  );
}
