import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  selected,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${
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
