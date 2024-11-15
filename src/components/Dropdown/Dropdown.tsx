import { useSearchParams } from 'react-router-dom';
import { FC, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import cn from 'classnames';

import { useTheme } from '../../app/hooks';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  sortType: string;
  sortKeys: string[];
}

export const Dropdown: FC<Props> = ({ sortKeys, sortType }) => {
  const [searchParams, SetSearchParams] = useSearchParams();
  const { isDark } = useTheme();

  const currentParam = searchParams.get(sortType);
  const [selectedItem, setSelectedItem] = useState(currentParam || sortKeys[0]);

  const displayableName =
    selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1);

  function handleSelection(selectedElement: string) {
    SetSearchParams(() =>
      getSearchWith(searchParams, {
        [sortType]: selectedElement.toLowerCase(),
        ['page-number']: '1',
      }),
    );

    setSelectedItem(selectedElement);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <MenuButton
              className={cn(
                'flex items-center h-40 w-full justify-between',
                'rounded-sm bg-surface2 px-12 text-sm border',
                'transition-all duration-200 ease-in-out',
                {
                  'border-icons hover:border-secondary': !isDark,
                  'border-surface2 hover:border-icons': isDark,
                  'data-[open]:border-primary': !isDark,
                  'data-[open]:border-accent': isDark,
                },
              )}
            >
              {displayableName}
              {open ? (
                <FiChevronUp className="h-16 w-16 text-secondary" />
              ) : (
                <FiChevronDown className="h-16 w-16 text-secondary" />
              )}
            </MenuButton>
          </div>

          <MenuItems
            transition
            className={cn(
              'absolute top-[105%] w-full',
              'border border-elements rounded-sm transition focus:outline-none',
              'data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0',
              'data-[enter]:duration-100 data-[enter]:ease-out',
              'data-[leave]:duration-75 data-[leave]:ease-in z-10',
              { 'bg-white': !isDark, 'bg-black': isDark },
            )}
          >
            <div className="py-1">
              {sortKeys.map(key => {
                const isSelected =
                  key.toLowerCase() === selectedItem.toLowerCase();

                return (
                  <MenuItem key={key}>
                    <div
                      onClick={() => handleSelection(String(key))}
                      className={cn(
                        'flex items-center justify-start w-full h-40 px-12 rounded-sm cursor-pointer',
                        'transition-all duration-300 ease-in-out hover:text-primary',
                        {
                          'hover:bg-elements': !isDark,
                          'hover:bg-surface2': isDark,
                          'bg-elements text-primary': isSelected && !isDark,
                          'bg-surface2 text-primary': isSelected && isDark,
                          'text-secondary': !isSelected,
                        },
                      )}
                    >
                      {key}
                    </div>
                  </MenuItem>
                );
              })}
            </div>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};
