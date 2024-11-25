import { Button } from '../Button';
import { useState } from 'react';
import { Loader } from '../Loader';
import { ButtonName } from '../../types';
import { doSignOut } from '../../firebase/auth';

interface Props {
  onClose: () => void;
}

export const LogoutModule: React.FC<Props> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => doSignOut(), 800);
    setTimeout(() => setIsLoading(false), 800);
    setTimeout(() => onClose(), 900);
  };

  return (
    <div className="relative gap-8 p-16 bg-elements rounded-xl flex flex-col desktop:gap-12 items-center desktop:p-32 mobile:p-16 mobile:gap-8">
      <h2 className="text-center">Are you sure you want to log out?</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <Button className="w-full m-8 text-white" onClick={handleLogout}>
          {ButtonName.LOGOUT}
        </Button>
      )}

      <button
        onClick={onClose}
        className="text-secondary hover:underline focus:outline-none"
      >
        {ButtonName.CANCEL}
      </button>
    </div>
  );
};
