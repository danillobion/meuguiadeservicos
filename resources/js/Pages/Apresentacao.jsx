import CardServico from '@/components/ui/CardServico';
import MenuSuperior from '@/Layouts/MenuSuperior';
import { Search,MapPin } from 'lucide-react';
import { useState,useEffect } from 'react';
import SelectInput from '@/components/SelectInput';
import Masonry from 'react-masonry-css';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Tutorial } from '@/components/Dialog/Tutorial';

export default function Apresentacao() 
{
  const user = usePage().props.auth.user;
  const { flash } = usePage().props;
  
  const [listaCidades, setListaCidades] = useState([]);
  const [listaServicos, setListaServicos] = useState([]);
  const [listaTags, setListaTags] = useState([]);

  const [cidade, setCidade] = useState();
  const [busca, setBusca] = useState('');
  const [tagSelecionada, setTagSelecionada] = useState(null);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);


  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1,
  };

  const cabecalho = {
    titulo: "Serviço e/ou Estabelecimento",
    migalhas: [
      { href: "/", label: "Inicio" },
      { href: "#", label: "Apresentação" },
    ],
  };

  const buscar = async (cidade = null, texto = null, tag_id = null) => {
    const cidadeParam = cidade && cidade.trim() !== '' ? cidade : '-';
    const textoParam = texto && texto.trim() !== '' ? texto : '-';
    const tagParam = tag_id ? tag_id : '-';
    try {
      const response = await axios.get(`/pesquisar/${cidadeParam}/${textoParam}/${tagParam}`);
      setListaCidades(response.data.cidades);
      setListaServicos(response.data.servicos);
      setListaTags(response.data.tags);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleSelectChange = (e) => {
    const novaCidade = e.target.value;
    setCidade(novaCidade);
    buscar(novaCidade, busca, tagSelecionada);
  };

  const handleInputChange = (e) => {
    const novoTexto = e.target.value;
    setBusca(novoTexto);
    if (novoTexto.length >= 3) {
      buscar(cidade, novoTexto, tagSelecionada);
    } else if (novoTexto.length === 0) {
      buscar(cidade, '', tagSelecionada);
    }
  };

  const handleTagClick = (tagId) => {
    const novaTag = tagId === tagSelecionada ? null : tagId; // Toggle
    setTagSelecionada(novaTag);
    buscar(cidade, busca, novaTag);
  };

  const handleTutorial = (ocultar) => {
    if (ocultar) {
      axios.post(route('apresentacao.tutorial'))
        .then(() => setMostrarTutorial(false))
        .catch((error) => {
          toast.error(error.response?.data?.message || 'Erro ao ocultar tutorial.');
        });
    } else {
      setMostrarTutorial(false);
    }
  };

  useEffect(() => {
    if (user && user.tutorial === 1) {
      setMostrarTutorial(true);
    }
    buscar();
  }, []);

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
        <Head title={cabecalho.titulo} />
        <div className="p-3 mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">

        <div className="flex flex-col items-center pt-2 pb-8 md:pt-8">
          <motion.h1
            className="mb-4 text-4xl font-bold text-gray-900 sm:text-7xl hidden sm:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Meu guia de serviços
            </span>
          </motion.h1>
          <motion.span
            className="sm:w-3/4 text-center text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            O <b>Meu Guia de Serviços</b> é uma plataforma colaborativa onde os usuários ajudam a construir uma lista de serviços e estabelecimentos, como pedreiro, pintor, eletricista e opções como comércio local, saúde, educação e turismo.
          </motion.span>        
        </div>
          
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Campo de pesquisa maior */}
          <div className="relative w-full md:w-2/6">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <SelectInput
              id="tipo"
              name="tipo"
              value={cidade}
              onChange={handleSelectChange}
              className="bg-white shadow-xl text-2xl py-4 pl-12 pr-4 w-full border border-gray-300 rounded-xl focus:outline-none"
            >
              <option value="">Selecione a cidade</option>
              {listaCidades.map((item,index) => (
                <option key={index} value={item.cidade}>
                  {item.cidade}/{item.uf}
                </option>
              ))}
            </SelectInput>
          </div>

          {/* Outro campo menor */}
          <div className="relative w-full md:w-4/6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={busca}
              onChange={handleInputChange}
              className="bg-white shadow-xl text-2xl py-4 pl-12 pr-4 w-full border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Pesquisar por serviço ou estabelecimento"
            />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div className="mt-7 w-4/5 mb-0 flex flex-wrap gap-2 justify-center">
              {listaTags.map((item, index) => (
                <button
                key={index}
                onClick={() => handleTagClick(item.id)}
                className={`flex items-center rounded-full px-2 py-1 shadow-md transition duration-500
                  ${tagSelecionada === item.id ? 'bg-blue-500 text-white' : 'bg-blue-200 hover:bg-blue-300'}
                  `}
                  >
                  <span className="text-sm font-semibold">
                    {item.nome} {item.quantidade}
                  </span>
                </button>
              ))}
          </div>
        </div>

        <div className="mt-8">
            {listaServicos.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {listaServicos.map((card) => (
                  <CardServico key={card.id} conteudo={card} />
                ))}
              </Masonry>
            ) : (
              <p className="text-center text-gray-500">Nenhum registro encontrado.</p>
            )}
        </div>

        <Tutorial open={mostrarTutorial} onClose={handleTutorial} />

        </div>
    </MenuSuperior>
  );
}

