export function truncarTexto(texto, tamanho = 90) {
  if (!texto) return '';
  const maxLength = tamanho;
    if (texto.length > maxLength) {
      return texto.substring(0, maxLength) + '...';
    }
    return texto;
}
