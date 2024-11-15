import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';
import cn from 'classnames';

import { pageItems, sortBy } from '../../constants/sorting';
import { getSearchWith } from '../../utils/searchHelper';
import { Dropdown } from '../Dropdown';
import { useTheme } from '../../app/hooks';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark } = useTheme();

  const query = searchParams.get('query') || '';

  const sortTextClassNames = 'text-secondary text-small';

  function handleClearText() {
    setSearchParams(() =>
      getSearchWith(searchParams, {
        query: null,
        'page-number': '1',
      }),
    );
  }

  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    const normalizedInputValue = event.currentTarget.value
      .toLowerCase()
      .trimStart();

    if (normalizedInputValue !== query) {
      setSearchParams(() =>
        getSearchWith(searchParams, {
          query: normalizedInputValue || null,
          'page-number': '1',
        }),
      );
    }
  }

  return (
    <section
      className={cn(
        'flex items-end flex-col-reverse gap-16 mb-24 mt-32',
        'tablet:flex-row tablet:mt-40',
      )}
    >
      <div className={cn('flex gap-16 w-full tablet:w-auto')}>
        <div className="flex flex-col w-1/2 gap-4 tablet:w-[176px]">
          <span className={sortTextClassNames}>Sort by</span>
          <Dropdown sortType="sort-by" sortKeys={sortBy} />
        </div>

        <div className="flex flex-col w-1/2 gap-4 tablet:w-[128px]">
          <span className={sortTextClassNames}>Items on page</span>
          <Dropdown sortType="items-on-page" sortKeys={pageItems} />
        </div>
      </div>

      <div className="w-full relative tablet:flex-1">
        <input
          onChange={handleChangeQuery}
          value={query}
          placeholder="Your future device name..."
          type="text"
          className={cn(
            'h-40 w-full border rounded-sm px-18 transition-all duration-300 ease-in-out focus:outline-none',
            {
              'bg-white border-elements hover:border-secondary focus:border-primary':
                !isDark,
              'bg-surface2 border-surface2 hover:border-icons focus:border-accent':
                isDark,
            },
          )}
        />
        {!!query && (
          <button
            onClick={handleClearText}
            className="absolute h-12 aspect-square top-1/3 right-16"
          >
            <FiX className="h-full w-full" />
          </button>
        )}
      </div>
    </section>
  );
};
