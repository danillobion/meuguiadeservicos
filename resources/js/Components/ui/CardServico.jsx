import { truncarTexto } from "@/utils/truncarTexto";
import { ArrowRight, MapPin } from "lucide-react";


export default function CardServico({ conteudo }) {
    
  return (
    <div className="shadow-lg w-full sm:max-w-sm bg-white border border-gray-200 rounded-xl flex flex-col justify-between">
        <div className="p-5">
            <div>
                <div className="mt-2 mb-2 flex flex-wrap items-center gap-2">
                    <div className="flex items-center bg-purple-100 rounded-lg px-2 py-1">
                        <span className="text-purple-700 text-xs font-semibold">
                            {conteudo.tipo == "EST" ? "Estabelecimento" : "Serviço"}</span>
                    </div>
                </div>

                {/* nome */}
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900">{truncarTexto(conteudo.nome)}</h5>
                
                {/* descricao */}
                <p className="mb-3 font-normal text-gray-700">{truncarTexto(conteudo.descricao)}</p>

                {/* habilidades */}
                <div className="mt-2 mb-3 flex flex-wrap items-center gap-2">
                    {conteudo.tags.map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                            <span className="text-gray-700 text-sm font-semibold">{item.nome}</span>
                        </div>
                    ))}
                </div>

                {/* cidade/uf */ }
                <div className="flex mb-3">
                    <MapPin size={18} />
                    <p className="text-sm font-normal text-gray-700">{conteudo.endereco.cidade}/{conteudo.endereco.uf}</p>
                </div>

            </div>
            {/* ler mais */}
            <a href={`/catalogo/${conteudo.id}`} 
                className="shadow-md inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Ler mais
                <ArrowRight className="ml-2 -mr-1 w-4 h-4"/>
            </a>
        </div>
    </div>
  );
}
