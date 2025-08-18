import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";

export function Acao({ 
  item = null,
  titulo = "", 
  subtitulo = "", 
  botaoAbrirTexto = "Abrir",
  botaoAbrirCor = "bg-gray-300 hover:bg-gray-400 text-black font-gray px-4 py-2 rounded-md",
  botaoCancelarTexto = "Cancelar", 
  botaoAcao = true, 
  botaoAcaoTexto = "Ativar", 
  botaoAcaoCor = "bg-green-500 hover:bg-green-600", 
  onAcao })
{
  const [open, setOpen] = useState(false);

  const [usuarioId, setUsuarioId] = useState(item?.id || null);

  useEffect(() => {
    if (open) {
      setUsuarioId(item?.id || null);
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={botaoAbrirCor ? botaoAbrirCor : "bg-gray-300 hover:bg-gray-400 text-black font-gray px-4 py-2 rounded-md"}
        type="button"
        onClick={() => setOpen(true)}
      >
        {botaoAbrirTexto}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titulo}</AlertDialogTitle>
          <AlertDialogDescription>
            {subtitulo}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>{botaoCancelarTexto}</AlertDialogCancel>
          {botaoAcao && 
            <AlertDialogAction
              className={botaoAcao ? `text-white ${botaoAcaoCor} font-bold px-4 py-2 rounded-md` : "bg-gray-300 hover:bg-gray-400 text-black font-gray px-4 py-2 rounded-md"}
              onClick={() => {
                const dados = {
                  id: usuarioId,
                };

                onAcao?.(dados);
                setOpen(false);
              }}
            >
              {botaoAcaoTexto}
            </AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
