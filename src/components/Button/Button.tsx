import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { useTheme } from '../../app/hooks';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<Props> = ({
  children,
  onClick = () => {},
  className,
  selected,
  type = 'button',
}) => {
  const { isDark } = useTheme();

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(styles.button, className, {
        'text-accent border border-elements bg-white': selected && !isDark,
        'text-white bg-accent': !selected && !isDark,
        'bg-surface2': selected && isDark,
        'bg-accent hover:bg-accent-light shadow-none': !selected && isDark,
      })}
    >
      {children}
    </button>
  );
};
