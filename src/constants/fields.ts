import { FormFields } from '../types';

const contactsStartData = {
  [FormFields.NAME]: '',
  [FormFields.EMAIL]: '',
  [FormFields.PHONE]: '',
  [FormFields.MESSAGE]: '',
};

const loginStartData = {
  [FormFields.EMAIL]: '',
  [FormFields.PASSWORD]: '',
};

export { contactsStartData, loginStartData };
