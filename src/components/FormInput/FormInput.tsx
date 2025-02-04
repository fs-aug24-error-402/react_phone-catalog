import cn from 'classnames';
import React from 'react';
import { Error } from '../../types/Error';
import { useTheme } from '../../app/hooks';

interface Props {
  type?: string;
  placeholder: string;
  value: string;
  className?: string;
  inputType?: 'city' | 'warehouse';
  hasError: Error;
  formatter?: (value: string) => string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onInput?: (type: 'city' | 'warehouse') => void;
  maxLength?: number;
}

export const FormInput: React.FC<Props> = ({
  type = 'text',
  placeholder,
  value,
  className,
  hasError,
  formatter,
  setter,
  onInput,
  inputType = 'city',
  maxLength = 50,
}) => {
  const { isDark } = useTheme();
  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      formatter?: (value: string) => string,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatter
        ? formatter(e.target.value)
        : e.target.value;

      setter(formattedValue);
    };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        `w-full border p-8 rounded-sm focus:outline-none focus:border-primary ${className}`,
        'transition-colors duration-300',
        {
          'bg-white border-elements hover:border-secondary focus:border-primary':
            !isDark,
          'bg-surface2 border-surface2 hover:border-icons focus:border-accent':
            isDark,
          'border-red-500': hasError !== Error.NONE,
        },
      )}
      value={value}
      onChange={handleInputChange(setter, formatter)}
      onFocus={() => onInput?.(inputType)}
      maxLength={maxLength}
    />
  );
};
