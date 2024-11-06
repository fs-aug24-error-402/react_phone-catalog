import { FC, ReactNode } from 'react';
import './Button.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  selected,
}) => {
  return (
    <button
      onClick={onClick}
      className={`button ${
        selected
          ? 'text-accent border border-elements bg-white'
          : 'text-white bg-accent'
      }
      ${className}
      active:text-accent active:border-elements active:bg-white`}
    >
      {children}
    </button>
  );
};
