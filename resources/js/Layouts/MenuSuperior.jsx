import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { formatarNome } from '@/utils/formatarNome';
import { Instagram } from 'lucide-react';

function AdminLinks({ isMobile = false }) {
  const user = usePage().props.auth.user;

  if (!user?.root) return null;

  return isMobile ? (
    <>
      <ResponsiveNavLink href={route('admin.dashboard.index')} active={route().current('admin.dashboard.index')}>Dashboard</ResponsiveNavLink>
      <ResponsiveNavLink href={route('admin.usuarios.index')} active={route().current('admin.usuarios.index')}>Usuários</ResponsiveNavLink>
      <ResponsiveNavLink href={route('admin.catalogos.index')} active={route().current('admin.catalogos.index')}>Catálogo</ResponsiveNavLink>
      <ResponsiveNavLink href={route('admin.tags.index')} active={route().current('admin.tags.index')}>Tags</ResponsiveNavLink>
    </>
  ) : (
    <>
      <Dropdown.Link href={route('admin.dashboard.index')}>Dashboard</Dropdown.Link>
      <Dropdown.Link href={route('admin.usuarios.index')}>Usuários</Dropdown.Link>
      <Dropdown.Link href={route('admin.catalogos.index')}>Catálogo</Dropdown.Link>
      <Dropdown.Link href={route('admin.tags.index')}>Tags</Dropdown.Link>
    </>
  );
}

export default function MenuSuperior({ header, children }) {
  const user = usePage().props.auth.user;
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b border-gray-100 bg-white">
        {/* link do instagram */}
        <div className='bg-gradient-to-r from-blue-500 to-purple-600'> 
          <div className='mx-auto max-w-7xl p-2 sm:px-6 lg:px-8 text-white flex items-center justify-end'>
            Estamos no Insta 👉 
            <Instagram className='inline-block ml-2 mr-2' /> 
            <a 
              href="https://www.instagram.com/meuguiadeservicos/" 
              target="_blank"
              className='font-bold'
            >@meuguiadeservicos</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-8 sm:h-6 w-auto fill-current text-gray-800" />
                </Link>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              {user === null ? (
                // <div className="hidden space-x-3 sm:flex">
                //   <NavLink href={route('catalogo.index')} active={route().current('catalogo.index')}>Cadastre-se</NavLink>
                //   <NavLink href={route('login')} active={route().current('login')}>Entrar</NavLink>
                // </div>
                <div className='space-x-1'>
                  <Link
                    href={route('catalogo.index')}
                    className="rounded-full shadow-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >Cadastre-se</Link>
                  <Link
                    href={route('login')}
                    className="rounded-full text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                  >Entrar</Link>
                </div>
              ) : (
                  <Dropdown>
                    <Dropdown.Trigger>
                      <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                        Olá, {formatarNome(user.name)}
                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                      <AdminLinks />
                      <Dropdown.Link href={route('servico.listar')}>Meus serviços</Dropdown.Link>
                      <Dropdown.Link href={route('estabelecimento.listar')}>Meus estabelecimentos</Dropdown.Link>
                      <Dropdown.Link href={route('meus-dados.index')}>Meus dados</Dropdown.Link>
                      <Dropdown.Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        onClick={() => setShowingNavigationDropdown(false)}
                      >
                        Sair
                      </Dropdown.Link>
                    </Dropdown.Content>
                  </Dropdown>
              )}
            </div>

            <div className="flex items-center sm:hidden -me-2">
              {user === null ? (
                <div className='space-x-1'>
                  <Link
                    href={route('catalogo.index')}
                    className="rounded-full shadow-md text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                  >Cadastre-se</Link>
                  <Link
                    href={route('login')}
                    className="rounded-full text-black bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                  >Entrar</Link>
                </div>
              ) : (
                <button
                  onClick={() => setShowingNavigationDropdown(prev => !prev)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  {!showingNavigationDropdown ? (
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            
          </div>
        </div>

        {showingNavigationDropdown && (
          <div className="sm:hidden">
            {user ? (
              <>
                <div className="space-y-1 pb-3 pt-2">
                  <ResponsiveNavLink href={route('apresentacao.index')} active={route().current('apresentacao.index')}>Apresentação</ResponsiveNavLink>
                </div>

                <div className="border-t border-gray-200 pb-1 pt-4">
                  <div className="px-4">
                    <div className="text-base font-medium text-gray-800">{formatarNome(user.name)}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>

                  <div className="mt-3 space-y-1">
                    <AdminLinks isMobile />
                    <ResponsiveNavLink href={route('servico.listar')} active={route().current('servico.listar')}>Meus serviços</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('estabelecimento.listar')} active={route().current('estabelecimento.listar')}>Meus estabelecimentos</ResponsiveNavLink>
                    <ResponsiveNavLink href={route('meus-dados.index')} active={route().current('meus-dados.index')}>Meus dados</ResponsiveNavLink>
                    <ResponsiveNavLink method="post" href={route('logout')} as="button">Sair</ResponsiveNavLink>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1 pb-3 pt-2">
                <ResponsiveNavLink href={route('catalogo.index')} active={route().current('catalogo.index')}>Cadastre-se</ResponsiveNavLink>
                <ResponsiveNavLink href={route('login')} active={route().current('login')}>Entrar</ResponsiveNavLink>
              </div>
            )}
          </div>
        )}
      </nav>

      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>
        <Toaster />
        {children}
      </main>
    </div>
  );
}
