const nameRegex = /^[A-Za-zА-Яа-яЇїІіЄє]+$/;
const validityPeriodRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
const validateCardNumberRegex = /^\d{16}$/;
const validateCvvRegex = /^\d{3}$/;
const phoneRegex = /^\+?\d{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (firstName: string) => {
  if (!nameRegex.test(firstName)) {
    return true;
  }

  return false;
};

export const validateEmail = (email: string) => {
  if (!emailRegex.test(email)) {
    return true;
  }

  return false;
};

export const validatePhone = (phone: string) => {
  const cleanedPhone = phone.replace(/\D/g, '');

  if (phoneRegex.test(cleanedPhone)) {
    return true;
  }

  return false;
};

export const validateCardNumber = (number: string) => {
  const cleanedCardNumber = number.replace(/\D/g, '');

  if (!validateCardNumberRegex.test(cleanedCardNumber)) {
    return true;
  }

  return false;
};

export const validateValidityPeriod = (validity: string) => {
  if (!validityPeriodRegex.test(validity)) {
    return true;
  }

  return false;
};

export const validateCVV = (cvv: string) => {
  if (!validateCvvRegex.test(cvv)) {
    return true;
  }

  return false;
};
