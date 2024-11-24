import { FormFields, Error } from '../types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;

interface FormDataFields {
  name?: string;
  email: string;
  password?: string;
  message?: string;
  phone?: string;
}

export const validateContactForm = (formData: FormDataFields) => {
  if (Object.values(formData).some(value => !value?.trim())) {
    return Error.EMPTY_FIELDS;
  }

  for (const [field, value] of Object.entries(formData)) {
    const trimmedValue = value?.trim() || '';

    switch (field) {
      case FormFields.NAME:
        if (!trimmedValue) {
          return Error.EMPTY_NAME;
        }

        break;

      case FormFields.EMAIL:
        if (!emailRegex.test(trimmedValue)) {
          return Error.INVALID_EMAIL;
        }

        break;

      case FormFields.PHONE:
        if (trimmedValue && !phoneRegex.test(trimmedValue)) {
          return Error.INVALID_PHONE_NUMBER;
        }

        break;

      case FormFields.MESSAGE:
        if (!trimmedValue) {
          return Error.EMPTY_MESSAGE;
        }

        break;

      case FormFields.PASSWORD:
        if (!trimmedValue) {
          return Error.EMPTY_PASSWORD;
        }

        break;

      default:
        break;
    }
  }

  return Error.NONE;
};
