
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export default function CabecalhoPagina({ cabecalho }) {
  const { titulo, migalhas, aviso } = cabecalho;

  return (
    <div className="mt-10 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">{titulo}</h1>

        {aviso && (
          <Alert
            variant="default"
            className="p-2 text-sm max-w-xs flex items-start gap-2 border rounded-md"
          >
            <AlertCircleIcon className="w-4 h-4 mt-0" />
            <div>
              <AlertTitle className="text-sm font-medium mt-2">{aviso?.titulo}</AlertTitle>
              <AlertDescription className="text-xs text-gray-500">
                {aviso?.mensagem}
              </AlertDescription>
            </div>
          </Alert>
        )}
      </div>
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-1 text-sm text-gray-500 mt-2">
          {migalhas.map((item, index) => {
            const isLast = index === migalhas.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                {item.href !== "#" ? (
                //   <Link
                //     href={item.href}
                //     className={`hover:underline ${isLast ? "font-medium text-gray-700" : ""}`}
                //     aria-current={isLast ? "page" : undefined}
                //   >
                //     {item.label}
                //   </Link>
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
  );
}
