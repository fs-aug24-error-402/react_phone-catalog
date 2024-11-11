import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { getSearchWith } from '../../utils/searchHelper';
import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  sortType: string;
  sortKeys: string[];
}

export const Dropdown: FC<Props> = ({ sortKeys, sortType }) => {
  const [searchParams, SetSearchParams] = useSearchParams();

  const currentParam = searchParams.get(sortType);
  const [selecteditem, setSelectedItem] = useState(currentParam || sortKeys[0]);

  const displayableName =
    selecteditem.charAt(0).toUpperCase() + selecteditem.slice(1);

  const dropdownId = `dropdown-${sortKeys.join('').replaceAll(' ', '')}`;
  const dropdownItemsId = `dropdown-items-${sortKeys
    .join('')
    .replaceAll(' ', '')}`;

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
              id={dropdownId}
              className="flex items-center h-40 w-[100%] justify-between pl-12
          gap-x-1.5 rounded-sm bg-white px-12 text-sm font-semibold
        text-primary shadow-sm ring-1 ring-elements hover:ring-primary"
            >
              {displayableName}
              <img
                src={
                  open
                    ? 'img/icons/svg/icon-arrow-up-inactive.svg'
                    : 'img/icons/svg/icon-arrow-down.svg'
                }
              />
            </MenuButton>
          </div>

          <MenuItems
            id={dropdownItemsId}
            transition
            className="absolute border shadow-2xl top-[105%] w-[100%] bg-white
          rounded-sm transition focus:outline-none data-[closed]:scale-95
          data-[closed]:transform data-[closed]:opacity-0
          data-[enter]:duration-100 data-[leave]:duration-75
          data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {sortKeys.map(key => {
                const isSelected =
                  key.toLowerCase() === selecteditem.toLowerCase();

                return (
                  <MenuItem key={key}>
                    <li
                      onClick={() => handleSelection(String(key))}
                      className={`${isSelected ? 'bg-elements' : 'bg-white'}
                  flex items-center rounded-sm justify-center cursor-pointer
                  hover:bg-elements h-40 w-[100%] border-elements`}
                    >
                      {key}
                    </li>
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
