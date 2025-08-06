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
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";

export function EditarCredito({ item = null,quantidade_servico,quantidade_estabelecimento, onSalvar })
{
  const [open, setOpen] = useState(false);

  const [usuarioId, setUsuarioId] = useState(item?.id || null);
  const [qtdServico, setQtdServico] = useState(quantidade_servico || "");
  const [qtdEstabelecimento, setQtdEstabelecimento] = useState(quantidade_estabelecimento || "");

  useEffect(() => {
    if (open) {
      setUsuarioId(item?.id || null);
      setQtdServico(quantidade_servico || "");
      setQtdEstabelecimento(quantidade_estabelecimento || "");
    }
  }, [open, quantidade_servico, quantidade_estabelecimento]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className="bg-gray-300 hover:bg-gray-400 text-black font-gray px-4 py-2 rounded-md"
        type="button"
        onClick={() => setOpen(true)}
      >
        Editar Crédito
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Crédito</AlertDialogTitle>
          <AlertDialogDescription>
            Essa pode ser desfeita.
          </AlertDialogDescription>
          <div className="space-y-2 mt-4 text-left">
            <InputLabel htmlFor="qtdServico" value="Quantidade de Serviços" />
            <TextInput
              id="qtdServico"
              type="number"
              name="qtdServico"
              className="mt-1 block w-full"
              autoComplete="tag"
              placeholder="Digite a quantidade de serviços"
              value={qtdServico}
              onChange={(e) => setQtdServico(e.target.value)}
            />
          </div>

          <div className="space-y-2 mt-4 text-left">
            <InputLabel htmlFor="qtdEstabelecimento" value="Quantidade de Estabelecimentos" />
            <TextInput
              id="qtdEstabelecimento"
              type="number"
              name="qtdEstabelecimento"
              className="mt-1 block w-full"
              autoComplete="tag"
              placeholder="Digite a quantidade de estabelecimentos"
              value={qtdEstabelecimento}
              onChange={(e) => setQtdEstabelecimento(e.target.value)}
            />
          </div>

        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-600 hover:bg-green-700 text-white font-green px-4 py-2 rounded-md"
            onClick={() => {
              const dados = {
                id: usuarioId,
                quantidade_servico: qtdServico,
                quantidade_estabelecimento: qtdEstabelecimento
              };

              onSalvar?.(dados);
              setOpen(false);
            }}
          >
            Salvar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
