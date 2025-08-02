import MenuSuperior from '@/Layouts/MenuSuperior';
import { Head, Link } from '@inertiajs/react';
import CabecalhoPagina from '@/components/ui/CabecalhoPagina';
import { formatarTelefone } from '@/utils/formatarTelefone';
import { ArrowLeft, Facebook, Globe, Instagram, Mail, MapPin, Phone, User } from 'lucide-react';

export default function Detalhe({catalogo}) {
  const cabecalho = {
    titulo: catalogo.nome,
    migalhas: [
      { href: "/", label: "Inicio" },
      { href: "#", label: catalogo.nome },
    ],
  };

  return (
    <MenuSuperior>
      <Head title={catalogo.nome} />
      
      <div className="pr-3 pl-3 mx-auto max-w-3xl sm:px-6 lg:px-8 pb-12 mt-10">

        <Link href="/" className="flex text-gray-500 hover:text-gray-600">
          <ArrowLeft size={40} />
          <span className='mt-0 text-3xl font-bold'>Voltar</span>
        </Link>

        <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-6 mt-4">
          <div className="mt-2 mb-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-purple-100 rounded-lg px-2 py-1">
                  <span className="text-purple-700 text-sm font-semibold">
                      {catalogo.tipo == "EST" ? "Estabelecimento" : "Serviço"}</span>
              </div>
          </div>
          <div className="mb-4">
            <h5 className="mb-2 text-4xl font-medium tracking-tight text-gray-900">{catalogo.nome}</h5>
          </div>
          <div className="mb-4">
            <p className='text-gray-600'>Descrição</p>
            <p className='text-lg font-medium'>{catalogo.descricao}</p>
          </div>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 mt-2">
              {catalogo.tags.map((item, index) => (
                <p className='flex items-center rounded-full px-3 py-1 transition duration-500 bg-gray-200' 
                  key={index}>{item.nome}</p>
              ))}
            </div>
          </div>

          <h2 className="text-2xl text-gray-600 mb-4">Outras informações</h2>
          <div className="mb-4">
            <p className='text-gray-600'>Cidade/UF</p>
            <div className="flex mt-2">
              <MapPin size={18} className='mt-0.5' />
              <p className="font-medium text-gray-700">
                {catalogo.endereco.cidade}/{catalogo.endereco.uf}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {catalogo.user.name && (
            <div>
              <p className='text-gray-600'>Falar com</p>
              <div className="flex mt-2">
                <User size={18} className='mt-0.5 mr-1' />
                <p className="font-medium text-gray-700">
                  {catalogo.user.name}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.site && (
            <div>
              <p className='text-gray-600'>Site</p>
              <div className="flex mt-2">
                <Globe size={18} className='mt-1 mr-1' />
                <p className="font-medium text-gray-700">
                  {catalogo.contato.site}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.telefone && (
            <div>
              <p className='text-gray-600'>Telefone</p>
              <div className="flex mt-2">
                <Phone size={18} className='mt-0.5 mr-2' />
                <p className="font-medium text-gray-700">
                  {formatarTelefone(catalogo.contato.telefone)}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.whatsapp && (
            <div>
              <p className='text-gray-600'>WhatsApp</p>
              <div className="flex mt-2">
                <Phone size={18} className='mt-0.5 mr-2' />
                <p className="font-medium text-gray-700">
                  {formatarTelefone(catalogo.contato.whatsapp)}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.email && (
            <div>
              <p className='text-gray-600'>E-mail</p>
              <div className="flex mt-2">
                <Mail size={18} className='mt-0.5 mr-2' />
                <p className="font-medium text-gray-700">
                  {catalogo.contato.email}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.facebook && (
            <div>
              <p className='text-gray-600'>Facebook</p>
              <div className="flex mt-2">
                <Facebook size={18} className='mt-0.5 mr-2' />
                <p className="font-medium text-gray-700">
                  {catalogo.contato.facebook}
                </p>
              </div>
            </div>
          )}
          {catalogo.contato.instagram && (
            <div>
              <p className='text-gray-600'>Instagram</p>
              <div className="flex mt-2">
                <Instagram size={18} className='mt-0.5 mr-2' />
                <p className="font-medium text-gray-700">
                  {catalogo.contato.instagram}
                </p>
              </div>
            </div>
          )}
        </div>


        </div>
      </div>
    </MenuSuperior>
  );
}
