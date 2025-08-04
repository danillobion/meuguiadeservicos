
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export default function CabecalhoPagina({ cabecalho }) {
  const { titulo, migalhas, aviso } = cabecalho;
  
  return (
    <>
      <div className="mt-10 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-900">{titulo}</h1>
        </div>
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-1 text-sm text-gray-500 mt-2">
            {migalhas.map((item, index) => {
              const isLast = index === migalhas.length - 1;
              return (
                <li key={item.href} className="flex items-center">
                  {item.href !== "#" ? (
                      <a href={item.href} className="hover:underline">{item.label}</a>
                  ) : (
                    <span className="text-gray-400">{item.label}</span>
                  )}

                  {!isLast && <span className="mx-1 text-gray-400">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <div className="pb-3">
        {aviso && (
            <Alert
              variant="default"
              className="bg-yellow-100 flex items-center gap-2 border-0 rounded-lg p-2 space-x-2"
            >
              <AlertCircleIcon className="w-5 h-5 mt-0" />
              <div>
                <AlertTitle 
                  className="text-sm font-normal mt-3"
                >
                  {aviso?.titulo}: {aviso?.mensagem}
                </AlertTitle>
              </div>
            </Alert>
          )}
      </div>
    </>
  );
}
