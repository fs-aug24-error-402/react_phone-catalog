import { NavLink, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

export const BackNavLink = () => {
  const navigate = useNavigate();

  const handleBack = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <NavLink to="#" onClick={handleBack} className="flex items-center gap-4">
      <img
        src="img/icons/svg/icon-arrow-left.svg"
        alt="Back icon"
        className="h-16 aspect-square"
      />
      <span
        className={
          'text-small leading-2 text-secondary hover:text-primary transition-color duration-300 ease-in-out'
        }
      >
        Back
      </span>
    </NavLink>
  );
};
