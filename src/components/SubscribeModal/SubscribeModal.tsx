import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Button } from '../Button';
import { useState } from 'react';
import { Loader } from '../Loader';
import { ButtonName, Error, FormFields } from '../../types';
import { subscribeStartData } from '../../constants/fields';
import { validateContactForm } from '../../utils/validateContactForm';
import { Snackbar, Alert } from '@mui/material';

interface Props {
  onClose: () => void;
}

export const SubscribeModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState(subscribeStartData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<Error>(Error.NONE);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateContactForm(formData);

    if (validationError !== Error.NONE) {
      setErrorType(validationError);
      setIsError(true);

      return;
    }

    setIsLoading(true);
    setIsSuccess(true);
    setTimeout(() => setIsLoading(false), 800);
    setTimeout(() => onClose(), 900);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="relative gap-8 p-16 bg-elements rounded-xl flex flex-col desktop:gap-12 items-center desktop:p-32 mobile:p-16 mobile:gap-8">
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
            onClose={() => setIsSuccess(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {Error.SUCCESS_SUBSCRIPTION}
          </Alert>
        </Snackbar>
      )}
      <h2 className="text-center">
        Still looking for an option?
        <br /> We have a deal for you!
      </h2>
      <p className="font-semibold text-center max-w-md">
        Subscribe and get all news about hot propositions first
      </p>

      <div className="w-full max-w-md rounded-md flex items-center justify-center">
        <img
          src="img\modal-can.png"
          className=" w-152 object-cover desktop:w-full tablet:w-2/3 tablet:h-2/3 mobile:w-3/5  mobile::h-3/5"
          alt="ICan©"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-12 items-center"
      >
        <input
          id={FormFields.NAME}
          type="text"
          placeholder="Name"
          value={formData[FormFields.NAME]}
          onChange={handleChange}
          className="w-full px-16 py-8 text-secondary border transition-colors duration-300 border-gray-300 rounded-sm hover:border-black focus:ring-black"
        />
        <input
          id={FormFields.EMAIL}
          type="email"
          placeholder="Email"
          value={formData[FormFields.EMAIL]}
          onChange={handleChange}
          className="w-full px-16 py-8 text-secondary border transition-colors duration-300 border-gray-300 rounded-sm hover:border-black focus:ring-black"
        />

        {isLoading ? (
          <Loader />
        ) : (
          <Button className="w-full m-8 text-white" type="submit">
            {ButtonName.SEND}
          </Button>
        )}

        <button
          onClick={onClose}
          className="mt-[2px] text-secondary hover:underline focus:outline-none"
        >
          No, thanks
        </button>
      </form>

      <div className="flex justify-center gap-16 mt-6">
        <a
          className="p-2 bg-gray-200"
          href="https://www.instagram.com/superpooper_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>

        <a
          className="p-2 bg-gray-200"
          href="https://www.linkedin.com/school/mateacademy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>

        <a
          className="p-2 bg-gray-200"
          href="https://www.youtube.com/watch?v=eo_ShBjsaD8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube size={24} />
        </a>
      </div>
    </div>
  );
};
