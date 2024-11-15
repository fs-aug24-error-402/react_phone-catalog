import React from 'react';
import cn from 'classnames';
import { NP } from '../../types';
import { useTheme } from '../../app/hooks';

interface Props {
  items: NP[];
  onSelect: (item: NP) => void;
  onClose: () => void;
}

export const FormDropdown: React.FC<Props> = ({ items, onSelect, onClose }) => {
  const { isDark } = useTheme();

  return (
    <ul
      className={cn(
        'flex flex-col gap-4 max-h-152 overflow-y-auto',
        'border border-elements rounded-sm focus:outline-none',
        { 'bg-white': !isDark, 'bg-black': isDark },
      )}
    >
      {items.map(item => (
        <li
          key={item.Ref}
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          className={cn(
            'block px-4 py-4 text-small w-full border-b border-elements',
            {
              'hover:bg-elements': !isDark,
              'hover:bg-surface2': isDark,
            },
          )}
        >
          {item.Description}
        </li>
      ))}
    </ul>
  );
};
