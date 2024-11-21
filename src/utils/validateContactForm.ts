import { FormFields, Error } from '../types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;

export const validateContactForm = (field: FormFields, value: string) => {
  let error = '';

  switch (field) {
    case FormFields.NAME:
      if (value.trim() === '') {
        error = Error.EMPTY_NAME;
      }

      break;
    case FormFields.EMAIL:
      if (!emailRegex.test(value)) {
        error = Error.INVALID_EMAIL;
      }

      break;

    case FormFields.PHONE:
      if (!phoneRegex.test(value)) {
        error = Error.INVALID_PHONE_NUMBER;
      }

      break;
    case FormFields.MESSAGE:
      if (value.trim() === '') {
        error = Error.EMPTY_MESSAGE;
      }

      break;

    case FormFields.PASSWORD:
      if (value.trim() === '') {
        error = Error.EMPTY_PASSWORD;
      }

      break;

    default:
      break;
  }

  return error;
};
