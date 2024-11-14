import { ContactFormFields } from '../types/ContactFormFields';
import { Error } from '../types/Error';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;

export const validateContactForm = (
  field: ContactFormFields,
  value: string,
) => {
  let error = '';

  switch (field) {
    case ContactFormFields.NAME:
      if (value.trim() === '') {
        error = Error.EMPTY_NAME;
      } else if (value.length < 2) {
        error = Error.SHORT_NAME;
      }

      break;
    case ContactFormFields.EMAIL:
      if (!emailRegex.test(value)) {
        error = Error.INVALID_EMAIL;
      }

      break;

    case ContactFormFields.PHONE:
      if (!phoneRegex.test(value)) {
        error = Error.INVALID_PHONE_NUMBER;
      }

      break;
    case ContactFormFields.MESSAGE:
      if (value.trim() === '') {
        error = Error.EMPTY_MESSAGE;
      }

      break;

    default:
      break;
  }

  return error;
};
