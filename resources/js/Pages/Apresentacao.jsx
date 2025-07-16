import CabecalhoPagina from '@/Components/ui/CabecalhoPagina';
import CardServico from '@/Components/ui/CardServico';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Search } from 'lucide-react';
import { useState,useEffect } from 'react';


export default function Apresentacao() 
{
  const [listaServicos, setListaServicos] = useState([]);
  const [listaTags, setListaTags] = useState([]);
  const [busca, setBusca] = useState('');
  
  const cabecalho = {
    titulo: "Serviço e/ou Estabelecimento",
    migalhas: [
      { href: "/", label: "Inicio" },
      { href: "#", label: "Apresentação" },
    ],
  };

  const buscar = async (texto = null, tag_id = null) => {
    try {
      const response = await axios.get(route('apresentacao.pesquisar', {texto: texto, tag_id: tag_id})); 
      setListaServicos(response.data.servicos);
      setListaTags(response.data.tags);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const texto = e.target.value;
    setBusca(texto);

    if (texto.length >= 3) {
      buscar(texto, null);
    } else if (texto.length === 0) {
      // Limpar busca caso o usuário apague tudo
      buscar(null, null);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  return (
    <MenuSuperior>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <CabecalhoPagina cabecalho={cabecalho} />

        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
            type="text"
            value={busca}
            onChange={handleInputChange}
            className="bg-white shadow-lg text-2xl py-4 pl-12 pr-4 w-full border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Pesquise pelo serviço ou estabelecimento"
            />
        </div>

        <div className="mt-7 mb-4 flex flex-wrap items-center gap-2">
            <h6 className="text-gray-600">Tags: </h6>
            {listaTags.map((item, index) => (
              <button
                key={index}
                onClick={() => buscar("-", item.id)}
                className="flex items-center bg-blue-200 rounded-full px-2 py-1 hover:bg-blue-300 shadow-md hover:shadow transition duration-500"
              >
                <span className="text-gray-700 text-sm font-semibold">
                  {item.nome} {item.quantidade}
                </span>
              </button>
            ))}
        </div>

        <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {listaServicos.map((card) => (
                <CardServico key={card.id} conteudo={card} />
            ))}
            </div>
        </div>

        {/* Exibe resultados filtrados */}
        {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicosFiltrados.length > 0 ? (
            servicosFiltrados.map((card) => (
              <CardServico key={card.id} conteudo={card} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Nenhum serviço encontrado.</p>
          )}
        </div> */}

        </div>
    </MenuSuperior>
  );
}

