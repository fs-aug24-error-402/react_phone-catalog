import { Error, NP } from '../types';
import {
  validateCardNumber,
  validateCVV,
  validateFirstName,
  validateLastName,
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
  let validationError: Error;

  validationError = validateFirstName(firstName);
  if (validationError !== Error.NONE) return validationError;

  if (!city) return Error.EMPTY_CITY;

  if (!warehouse) return Error.EMPTY_WAREHOUSE;

  validationError = validateLastName(lastName);
  if (validationError !== Error.NONE) return validationError;

  validationError = validatePhone(phone);
  if (validationError !== Error.NONE) return validationError;

  if (paymentMethod === 'card') {
    validationError = validateCardNumber(cardNumber);
    if (validationError !== Error.NONE) return validationError;

    validationError = validateValidityPeriod(validityPeriod);
    if (validationError !== Error.NONE) return validationError;

    validationError = validateCVV(CVV);
    if (validationError !== Error.NONE) return validationError;
  }

  return Error.NONE;
};
