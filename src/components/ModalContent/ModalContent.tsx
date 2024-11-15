import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Button } from '../Button';
import { useState } from 'react';
import { Loader } from '../Loader';
import { ButtonName } from '../../types';

interface Props {
  onClose: () => void;
}

export const ModalContent: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [buttonText, setButtonText] = useState(ButtonName.SEND);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!email) {
      setButtonText(ButtonName.ERROR);

      return;
    }

    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
    setTimeout(() => onClose(), 900);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.trimStart());
    setButtonText(ButtonName.SEND);
  };

  return (
    <div className="relative gap-8 p-16 bg-elements rounded-xl flex flex-col desktop:gap-12 items-center desktop:p-32 mobile:p-16 mobile:gap-8">
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
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          className="w-full px-16 py-8 text-secondary border transition-colors duration-300 border-gray-300 rounded-sm hover:border-black focus:ring-black"
        />

        {isLoading ? (
          <Loader />
        ) : (
          <Button className="w-full mt-8 text-white" type="submit">
            {buttonText}
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
