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
import SelectInput from "../SelectInput";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import { useEffect, useState } from "react";

export function EditarTag({ item = null, onSalvar })
{
  const [open, setOpen] = useState(false);

  const [tipo, setTipo] = useState(item?.tipo || "");
  const [nome, setNome] = useState(item?.nome || "");

  const isEditando = item !== null;

  useEffect(() => {
    if (open) {
      setTipo(item?.tipo || "");
      setNome(item?.nome || "");
    }
  }, [open, item]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        type="button"
        className={`${
          isEditando
            ? "text-blue-600 hover:underline"
            : "bg-gray-200 hover:bg-gray-300 text-black font-bold px-4 py-2 rounded-md"
        }`}
        onClick={() => setOpen(true)}
      >
        {isEditando ? "Editar" : "Nova tag"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{isEditando ? "Editar tag" : "Nova tag"}</AlertDialogTitle>
          
          <div className="space-y-2 mt-4 text-left">
            <InputLabel htmlFor="tipo" value="Preencha os campos abaixo" />
          <SelectInput
            id="tipo"
            name="tipo"
            className="bg-white pr-4 w-full border border-gray-300 rounded-md focus:outline-none"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="SER">Serviço</option>
            <option value="EST">Estabelecimento</option>
          </SelectInput>
          </div>

          <div className="space-y-2 mt-4 text-left">
            <InputLabel htmlFor="nome" value="Nome" />
            <TextInput
              id="nome"
              type="text"
              name="nome"
              className="mt-1 block w-full"
              autoComplete="tag"
              placeholder="Digite o nome da tag"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-green-600 hover:bg-green-700 text-white font-green px-4 py-2 rounded-md"
            onClick={() => {
              const dados = {
                id: item?.id || null,
                nome,
                tipo,
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
