import { useState } from 'react';
import { Button } from '../components/Button';
import { ButtonName, Error } from '../types';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { FirebaseError } from '@firebase/util';

import { FormFields } from '../types';
import { loginStartData } from '../constants/fields';
import { Snackbar, Alert } from '@mui/material';
import { validateContactForm } from '../utils/validateContactForm';

import style from '../styles/helpers/container.module.scss';
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithGithub,
  doCreateUserWithEmailAndPassword,
} from '../firebase/auth';

import { useAuth } from '../contexts/authContext';
import { Navigate, useNavigate } from 'react-router';

export const LogInPage: React.FC = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(loginStartData);
  const [errorType, setErrorType] = useState<Error>(Error.NONE);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function onLogIn() {
    const [email, password] = Object.values(formData);

    const validationError = validateContactForm(formData);

    if (validationError !== Error.NONE) {
      setErrorType(validationError);
      setIsError(true);

      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithEmailAndPassword(email, password);
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (signInError) {
        if (signInError instanceof FirebaseError) {
          setIsError(true);
          setErrorType(signInError.code as Error);
        } else {
          setIsError(true);
          setErrorType(Error.DEFAULT);
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  }

  async function onSignUp() {
    const [email, password] = Object.values(formData);

    const validationError = validateContactForm(formData);

    if (validationError !== Error.NONE) {
      setErrorType(validationError);
      setIsError(true);

      return;
    }

    if (!isSigningIn) {
      setIsSigningIn(true);
      await doCreateUserWithEmailAndPassword(email, password)
        .then(async () => {
          await onLogIn();
          setIsSuccess(true);
        })
        .catch(() => {
          setIsError(true);
          setErrorType(Error.DEFAULT);
        })
        .finally(() => setIsSigningIn(false));
    }
  }

  const onGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(() => {
        setIsSigningIn(false);
        setIsError(true);
        setErrorType(Error.DEFAULT);
      });
    }
  };

  const onGithubSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGithub().catch(() => {
        setIsSigningIn(false);
        setIsError(true);
        setErrorType(Error.DEFAULT);
      });
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  }

  return (
    <div className={style.container}>
      {userLoggedIn && <Navigate to={'/'} replace={true} />}
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

      {isSuccess && (
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => setIsSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setIsError(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {Error.SUCCESS_LOGIN}
          </Alert>
        </Snackbar>
      )}

      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-items-center justify-center flex-col rounded-sm shadow-md p-48">
          <div className="flex justify-center items-center mb-24">
            <h1 className="te">Sign Up</h1>
          </div>

          <form className="flex justify-center flex-col gap-16">
            <input
              id={FormFields.EMAIL}
              value={formData[FormFields.EMAIL]}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className="w-full px-16 py-8 text-secondary border transition-colors duration-300 border-gray-300 rounded-sm hover:border-black focus:ring-black"
            />

            <input
              id={FormFields.PASSWORD}
              value={formData[FormFields.PASSWORD]}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="border p-2 rounded p-8 hover:border-icons transition-colors duration-300 outline-none"
            />
            <div className="flex justify-center gap-8">
              <Button className="w-full mt-8 text-white" onClick={onSignUp}>
                {ButtonName.SIGN}
              </Button>

              <Button className="w-full mt-8 text-white" onClick={onLogIn}>
                {ButtonName.LOGIN}
              </Button>
            </div>
          </form>
          <div className="flex justify-center gap-16 mt-32">
            <button
              className="p-2"
              rel="noopener noreferrer"
              disabled={isSigningIn}
              onClick={onGoogleSignIn}
            >
              <FaGoogle size={24} />
            </button>

            <button
              className="p-2"
              rel="noopener noreferrer"
              disabled={isSigningIn}
              onClick={onGithubSignIn}
            >
              <FaGithub size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
