import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { Button } from '../Button';

interface Props {
  onClose: () => void;
}

export const ModalContent: React.FC<Props> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="relative bg-elements rounded-xl p-24 flex flex-col gap-18 items-center mx-4">
      <h1 className="text-3xl font-extrabold text-center">
        Still looking for an option?
        <br /> We have a deal for you!
      </h1>
      <p className="font-semibold text-center max-w-md">
        Subscribe and get all news about hot propositions first
      </p>

      <div className="w-full max-w-md rounded-md flex items-center justify-center">
        <img
          src="img\modal-can.png"
          className="object-cover w-full"
          alt="ICan©"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-18 items-center"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full px-16 py-8 text-secondary border border-gray-300 rounded-md focus:ring-black-500"
        />
        <Button className="w-full"> Subscribe</Button>

        <button
          onClick={onClose}
          className="mt-2 text-secondary hover:underline focus:outline-none"
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
