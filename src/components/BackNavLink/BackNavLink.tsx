import { NavLink, useNavigate } from 'react-router-dom';
import { FC, MouseEvent } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import cn from 'classnames';

import { useTheme } from '../../app/hooks';

interface Props {
  className?: string;
}

export const BackNavLink: FC<Props> = ({ className }) => {
  const { isDark } = useTheme();
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
      className={cn(
        'flex items-center gap-4 transition-color duration-300 ease-in-out',
        className,
        {
          'text-secondary hover:text-primary': !isDark,
          'text-primary hover:text-accent': isDark,
        },
      )}
    >
      <FiChevronLeft className="h-16 w-16" />

      <span className="text-small">Back</span>
    </NavLink>
  );
};
