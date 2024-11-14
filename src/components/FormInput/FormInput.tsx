import cn from 'classnames';
import React from 'react';
import { Error } from '../../types/Error';

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
        `w-full border border-elements p-8 rounded-sm focus:outline-none focus:border-primary ${className}`,
        'transition-colors duration-300',
        { 'border-red': hasError !== Error.DEFAULT },
      )}
      value={value}
      onChange={handleInputChange(setter, formatter)}
      onFocus={() => onInput?.(inputType)}
      maxLength={maxLength}
    />
  );
};
