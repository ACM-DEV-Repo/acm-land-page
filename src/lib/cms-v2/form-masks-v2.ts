/**
 * Máscaras para campos de formulário V2
 * Cópia isolada da V1, zero dependências externas
 */

export const maskPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 11);

  if (limited.length <= 2) return limited;
  if (limited.length <= 7) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
};

export const maskCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 11);

  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  if (limited.length <= 9) return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
};

export const maskDate = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 8);

  if (limited.length <= 2) return limited;
  if (limited.length <= 4) return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
};

export const maskCEP = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 8);

  if (limited.length <= 5) return limited;
  return `${limited.slice(0, 5)}-${limited.slice(5)}`;
};

export const maskWhatsApp = maskPhone;

export const getMaskFunction = (type: string): ((value: string) => string) | null => {
  switch (type) {
    case 'phone':
    case 'whatsapp':
      return maskPhone;
    case 'cpf':
      return maskCPF;
    case 'date':
      return maskDate;
    case 'cep':
      return maskCEP;
    default:
      return null;
  }
};
