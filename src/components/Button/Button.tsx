import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

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
      className={`${styles.button} ${selected ? 'text-accent border border-elements bg-white' : 'text-white bg-accent'} ${className}`}
    >
      {children}
    </button>
  );
};
