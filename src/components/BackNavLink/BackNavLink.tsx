/* eslint-disable max-len */
import { NavLink, useNavigate } from 'react-router-dom';
import { FC, MouseEvent } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

export const BackNavLink: FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = (
    event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <NavLink
      to="#"
      onClick={handleBack}
      className={cn('flex items-center gap-4', className)}
    >
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
