import { Star } from 'lucide-react';


export default function CardServico({ conteudo }) {
  return (
    <div className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-xl flex flex-col justify-between">
        <div className="p-5">
            <a href="#">
                {/* nome */}
                <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900">{conteudo.nome}</h5>
                
                {/* habilidades */}
                <div className="mt-2 mb-3 flex flex-wrap items-center gap-2">
                    {conteudo.tags.map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                            <span className="text-gray-700 text-sm font-semibold">{item.nome}</span>
                        </div>
                    ))}
                </div>

                {/* avaliacao */}
                {/* <div className="flex items-center mb-3">
                    {Array.from({ length: conteudo.availacao }).map((_, index) => (
                        <svg
                            key={index}
                            className="w-4 h-4 text-yellow-400 mr-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                </div> */}
            </a>
            {/* ler mais */}
            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Ler mais
                {/* <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg> */}
            </a>
        </div>
    </div>
  );
}
