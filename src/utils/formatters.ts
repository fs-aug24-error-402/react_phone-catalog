export const formatPhoneNumber = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '').slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (!cleaned) return '';

  if (match) {
    return !match[2]
      ? `(${match[1]}`
      : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
  }

  return cleaned;
};

export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '').slice(0, 16);
  const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);

  if (match) {
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join('-');
  }

  return cleaned;
};

export const formatValidityPeriod = (validityPeriod: string) => {
  const cleaned = validityPeriod.replace(/\D/g, '').slice(0, 4);
  const match = cleaned.match(/^(\d{0,2})(\d{0,2})$/);

  if (match) {
    return [match[1], match[2]].filter(Boolean).join('/');
  }

  return cleaned;
};
