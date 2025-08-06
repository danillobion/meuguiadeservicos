export function formatarNome(nome) {
  if (!nome) return '';
    const primeiroNome = nome.trim().split(/\s+/)[0]; 
    return primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();
}
