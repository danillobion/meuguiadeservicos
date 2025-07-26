export function formatarCep(cep) {
  if (!cep) return '';

  const numeros = cep.replace(/\D/g, '');

  if (numeros.length <= 5) return numeros;
  if (numeros.length <= 8) return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;

  return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`;
}