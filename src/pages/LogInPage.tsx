import { useState } from 'react';
import { Button } from '../components/Button';
import { ButtonName, Error } from '../types';
import { FormFields } from '../types';
import { loginStartData } from '../constants/fields';
import style from '../styles/helpers/container.module.scss';
import { Snackbar, Alert } from '@mui/material';
import { validateContactForm } from '../utils/validateContactForm';

export const LogInPage: React.FC = () => {
  const [formData, setFormData] = useState(loginStartData);
  const [formErrors, setFormErrors] = useState(loginStartData);
  const [errorType, setErrorType] = useState('');
  const [isError, setIsError] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(formErrors).some(value => value !== Error.DEFAULT)) {
      setErrorType(
        Object.values(formErrors).find(value => value !== Error.DEFAULT)!,
      );
      setIsError(true);

      return;
    }

    if (Object.values(formData).some(value => !value)) {
      setErrorType(Error.EMPTY_FIELDS);
      setIsError(true);

      return;
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    const error = validateContactForm(id as FormFields, value);

    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [id]: error,
    }));

    setErrorType(validateContactForm(id as FormFields, value));
  }

  return (
    <div className={style.container}>
      {isError && (
        <Snackbar
          open={isError}
          autoHideDuration={3000}
          onClose={() => setIsError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setIsError(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {errorType}
          </Alert>
        </Snackbar>
      )}

      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-items-center justify-center flex-col rounded-sm shadow-md p-48">
          <div className="flex justify-center items-center mb-24">
            <h1 className="te">Sign Up</h1>
          </div>

          <form
            className="flex justify-center flex-col gap-16"
            onSubmit={handleSubmit}
          >
            <input
              id={FormFields.EMAIL}
              value={formData[FormFields.EMAIL]}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="border p-2 rounded p-8 hover:border-icons transition-colors duration-300 outline-none"
            />

            <input
              id={FormFields.PASSWORD}
              value={formData[FormFields.PASSWORD]}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="border p-2 rounded p-8 hover:border-icons transition-colors duration-300 outline-none"
            />
            <Button className="w-full mt-8 text-white" type="submit">
              {ButtonName.SIGN}
            </Button>
            <button className=" duration-300 transition-all hover:underline">
              Enter as a guest
            </button>
          </form>
          <div className="flex justify-center flex-col">
            <button> Log In</button>
            ----------------or-------------
            <button>Sign Up with google</button>
            <button>Github</button>
          </div>
        </div>
      </div>
    </div>
  );
};
