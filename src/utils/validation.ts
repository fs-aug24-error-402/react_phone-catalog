import { Error } from '../types';

export const validateFirstName = (firstName: string): Error => {
  if (!firstName.trim()) {
    return Error.EMPTY_FIRST_NAME;
  }

  if (!/^[A-Za-zА-Яа-яЇїІіЄє]+$/.test(firstName)) {
    return Error.INVALID_FIRST_NAME;
  }

  return Error.DEFAULT;
};

export const validateLastName = (lastName: string): Error => {
  if (!lastName.trim()) {
    return Error.EMPTY_LAST_NAME;
  }

  if (!/^[A-Za-zА-Яа-яЇїІіЄє]+$/.test(lastName)) {
    return Error.INVALID_LAST_NAME;
  }

  return Error.DEFAULT;
};

export const validatePhone = (phone: string): Error => {
  const cleanedPhone = phone.replace(/\D/g, '');

  if (!cleanedPhone) {
    return Error.EMPTY_PHONE_NUMBER;
  }

  if (!/^0\d{9}$/.test(cleanedPhone)) {
    return Error.INVALID_PHONE_NUMBER;
  }

  return Error.DEFAULT;
};

export const validateCardNumber = (number: string) => {
  const cleanedCardNumber = number.replace(/\D/g, '');
  const regex = /^\d{16}$/;

  if (!regex.test(cleanedCardNumber)) {
    return Error.INVALID_CARD_NUMBER;
  }

  return Error.DEFAULT;
};

export const validateValidityPeriod = (validity: string) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!regex.test(validity)) {
    return Error.INVALID_EXPIRY_DATE;
  }

  return Error.DEFAULT;
};

export const validateCVV = (cvv: string) => {
  const regex = /^\d{3}$/;

  if (!regex.test(cvv)) {
    return Error.INVALID_CVV;
  }

  return Error.DEFAULT;
};
