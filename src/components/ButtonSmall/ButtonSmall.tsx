import { FC, ReactNode } from 'react';
import { useTheme } from '../../app/hooks';
import cn from 'classnames';

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonSmall: FC<Props> = ({
  children,
  onClick = () => {},
  className,
  disabled = false,
  type,
}) => {
  const { isDark } = useTheme();

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        className,
        'bg-surface2 rounded-lg aspect-square flex items-center justify-center transition-all duration-300 ease-in-out',
        {
          'border border-icons hover:border-primary': !disabled && !isDark,
          'border-none hover:bg-icons hover:border-none': !disabled && isDark,
          'border border-elements bg-transparent': disabled,
        },
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
