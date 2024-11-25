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

const subscribeStartData = {
  [FormFields.NAME]: '',
  [FormFields.EMAIL]: '',
};

export { contactsStartData, loginStartData, subscribeStartData };
