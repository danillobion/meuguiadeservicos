import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function InfoCredito({ open, onClose, dados }) {
  const [ocultar, setOcultar] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={() => onClose(ocultar)}>
      <AlertDialogContent className="rounded-xl w-full max-w-3xl max-h-[90vh] px-6 py-8 sm:px-8 sm:py-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-center">Limite de crédito</AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            {dados?.quantidade == 0 ? (
              <p>
                Você atingiu o número máximo de serviços cadastrados. 
                Para aumentar esse limite, entre em contato com nossa equipe por e-mail.
              </p>
            ) : (
              <p>
                No momento, você pode cadastrar até <b>{dados?.quantidade} {dados?.tipo == "EST" ? "serviços" : "estabelecimentos" }</b>.
                Quer aumentar esse limite? Fale com a gente por e-mail, será um prazer ajudar!
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex flex-col gap-2 w-full">
            <a 
              href="mailto:meuguiadeservicos@gmail.com" 
              className="shadow-lg text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-8 mb-2 text-center">
              Enviar e-mail para meuguiadeservicos@gmail.com
            </a>
            <AlertDialogCancel
              onClick={() => onClose(ocultar)}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium text-md px-5 py-8 rounded-md !border-0 !ring-0 focus:!outline-none focus:!ring-0 focus:!border-0 focus:!shadow-none shadow-none"
            >
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
