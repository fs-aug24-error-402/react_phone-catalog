import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

import { pageItems, sortBy } from '../../constants/sorting';
import { getSearchWith } from '../../utils/searchHelper';
import { Dropdown } from '../Dropdown/Dropdown';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const sortTextClassNames = 'text-secondary text-small font-medium';

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
      className="flex items-end justify-between gap-18 mb-24
        tablet:flex-row mobile:flex-col-reverse tablet:mt-40 mobile:mt-32"
    >
      <div
        className="flex gap-8 justify-between tablet:w-auto
          mobile:justify-around w-[100%]"
      >
        <div className="flex flex-col w-176">
          <span className={sortTextClassNames}>Sort by</span>
          <Dropdown sortType="sort-by" sortKeys={sortBy} />
        </div>

        <div className="flex flex-col w-[128px]">
          <span className={sortTextClassNames}>Items on page</span>
          <Dropdown sortType="items-on-page" sortKeys={pageItems} />
        </div>
      </div>

      <div className="w-full relative">
        <input
          onChange={handleChangeQuery}
          value={query}
          placeholder="Your future device name..."
          type="text"
          className={`h-40 w-full border-elements border
        rounded-sm px-18 focus:outline-none focus:border-black
        focus:placeholder-transparent`}
        />
        {!!query && (
          <button
            onClick={handleClearText}
            className="flex items-center justify-center absolute h-12 w-12
          top-16 right-16"
          >
            <img
              className="h-12 w-12"
              src="img/icons/svg/icon-close-black.svg"
              alt="clear text"
            />
          </button>
        )}
      </div>
    </section>
  );
};
