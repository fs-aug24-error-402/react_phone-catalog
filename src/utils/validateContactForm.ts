import { FormFields, Error } from '../types';
import { validateName, validatePhone, validateEmail } from './validation';
import { GenericDataForm } from '../interfaces/GenericDataForm';

export const validateContactForm = (formData: GenericDataForm) => {
  if (Object.values(formData).some(value => !value?.trim())) {
    return Error.EMPTY_FIELDS;
  }

  for (const [field, value] of Object.entries(formData)) {
    const trimmedValue = value?.trim() || '';

    switch (field) {
      case FormFields.NAME:
        if (validateName(trimmedValue)) {
          return Error.EMPTY_NAME;
        }

        break;

      case FormFields.EMAIL:
        if (validateEmail(trimmedValue)) {
          return Error.INVALID_EMAIL;
        }

        break;

      case FormFields.PHONE:
        if (validatePhone(trimmedValue)) {
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
