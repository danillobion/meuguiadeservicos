import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Link } from '@inertiajs/react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Tutorial({ open, onClose }) {
  const [ocultar, setOcultar] = useState(false);

  const handleConfetti = () => {
    const end = Date.now() + 5 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({ particleCount: 2, angle: 60, spread: 55, startVelocity: 60, origin: { x: 0, y: 0.5 }, colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, startVelocity: 60, origin: { x: 1, y: 0.5 }, colors });
      requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => {
    if (open) handleConfetti();
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={() => onClose(ocultar)}>
      <AlertDialogContent className="rounded-xl w-full max-w-3xl max-h-[90vh] px-6 py-8 sm:px-8 sm:py-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-center">Bem vindo(a) 👋</AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            <p style={{ textIndent: '2rem', textAlign: 'justify' }}>
              Você pode cadastrar um serviço que você mesmo saiba fazer, como por exemplo pintor, eletricista, encanador, manicure, entre outros.
              Ou, se preferir, pode cadastrar o seu próprio estabelecimento, como uma loja, clínica, restaurante, salão de beleza ou qualquer outro tipo de negócio.
              O cadastro é simples, rápido, gratuito e pode ajudar muitas pessoas da sua região a encontrarem exatamente o que precisam.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex flex-col gap-2 w-full">
            <Link href={route('servico.editar', 0)} className="shadow-lg text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-8 mb-2 text-center">
              Cadastrar um serviço
            </Link>
            <Link href={route('estabelecimento.editar', 0)} className="shadow-lg text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-5 py-8 mb-2 text-center">
              Cadastrar um estabelecimento
            </Link>
            <AlertDialogCancel
              onClick={() => onClose(ocultar)}
              className="bg-gray-200 hover:bg-gray-300 text-black font-medium text-md px-5 py-8 rounded-md !border-0 !ring-0 focus:!outline-none focus:!ring-0 focus:!border-0 focus:!shadow-none shadow-none"
            >
              Pular
            </AlertDialogCancel>
            {/* Checkbox */}
            <div className="mt-4 flex justify-start items-center px-2 py-3">
              <label className="inline-flex items-center gap-3 text-base cursor-pointer">
                <input
                  type="checkbox"
                  checked={ocultar}
                  onChange={e => setOcultar(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>Ocultar essa tela de boas-vindas</span>
              </label>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
