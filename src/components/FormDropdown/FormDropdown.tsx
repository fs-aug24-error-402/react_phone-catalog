import React from 'react';
import { NP } from '../../types/NovaPoshta';

interface Props {
  items: NP[];
  onSelect: (item: NP) => void;
  onClose: () => void;
}

export const FormDropdown: React.FC<Props> = ({ items, onSelect, onClose }) => {
  return (
    <ul className="flex flex-col gap-4 max-h-96 overflow-y-auto border rounded-sm">
      {items.map(item => (
        <li
          key={item.Ref}
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          className="block px-4 py-4 text-sm w-full border-b hover:bg-elements"
        >
          {item.Description}
        </li>
      ))}
    </ul>
  );
};
