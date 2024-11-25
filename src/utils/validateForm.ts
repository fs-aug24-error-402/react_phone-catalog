import { Error, NP } from '../types';
import {
  validateCardNumber,
  validateCVV,
  validateName,
  validatePhone,
  validateValidityPeriod,
} from './validation';

export const validateForm = (
  firstName: string,
  lastName: string,
  phone: string,
  city: NP | null,
  warehouse: string,
  paymentMethod: string,
  cardNumber: string,
  validityPeriod: string,
  CVV: string,
): Error => {
  if (validateName(firstName)) {
    return Error.EMPTY_FIRST_NAME;
  }

  if (!city) {
    return Error.EMPTY_CITY;
  }

  if (!warehouse) {
    return Error.EMPTY_WAREHOUSE;
  }

  if (validateName(lastName)) {
    return Error.EMPTY_LAST_NAME;
  }

  if (validatePhone(phone)) {
    return Error.INVALID_PHONE_NUMBER;
  }

  if (paymentMethod === 'card') {
    if (validateCardNumber(cardNumber)) {
      return Error.INVALID_CARD_NUMBER;
    }

    if (validateValidityPeriod(validityPeriod)) {
      return Error.INVALID_EXPIRY_DATE;
    }

    if (validateCVV(CVV)) {
      return Error.INVALID_CVV;
    }
  }

  return Error.NONE;
};
