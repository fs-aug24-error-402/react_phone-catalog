import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import cn from 'classnames';

import { Product } from '../../types';
import { getFilteredDevices } from '../../utils/utils';
import { getSearchWith } from '../../utils/searchHelper';
import { useTheme, useWindowWidth } from '../../app/hooks';

interface Props {
  items: Product[];
}

export const Pagination: FC<Props> = ({ items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useWindowWidth();
  const { isDark } = useTheme();

  const displayedPagesRange = isMobile ? 1 : 3;

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort-by') || '';

  const filteredItems = getFilteredDevices(items, query, sortBy);

  const itemsPerPage = Number(searchParams.get('items-on-page')) || 12;
  const currentPageNumber = Number(searchParams.get('page-number')) || 1;
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const isItFirstPage = currentPageNumber === 1;
  const isItLastPage = currentPageNumber === pageCount;

  const handlePageClick = (event: { selected: number }) => {
    setSearchParams(() =>
      getSearchWith(searchParams, {
        'page-number': String(event.selected + 1),
      }),
    );
  };

  return (
    <>
      <ReactPaginate
        className="flex items-center gap-8 justify-center max-w-full"
        pageLinkClassName={cn(
          'flex items-center justify-center rounded-lg h-32 w-32',
          'leading-none text-center transition-all duration-300 ease-in-out',
          {
            'border border-elements hover:border-primary': !isDark,
            'bg-surface1 hover:bg-elements': isDark,
          },
        )}
        activeLinkClassName={cn('pointer-events-none', {
          'bg-primary border-primary text-white': !isDark,
          '!bg-accent': isDark,
        })}
        breakLinkClassName={cn(
          'flex items-center justify-center pointer-events-none',
          'text-secondary rounded-lg h-32 w-32',
          { 'border border-elements': !isDark, 'bg-surface1': isDark },
        )}
        breakLabel="..."
        nextLabel={<FiChevronRight className="h-16 w-16" />}
        nextLinkClassName={cn(
          'flex justify-center items-center ml-8 rounded-lg border',
          'text-primary border-icons hover:border-primary h-32 w-32',
          { 'text-icons pointer-events-none': isItLastPage },
        )}
        onPageChange={handlePageClick}
        pageRangeDisplayed={displayedPagesRange}
        marginPagesDisplayed={displayedPagesRange}
        pageCount={pageCount}
        previousLabel={<FiChevronLeft className="h-16 w-16" />}
        previousLinkClassName={cn(
          'flex justify-center items-center ml-8 rounded-lg border',
          'text-primary border-icons hover:border-primary h-32 w-32',
          { 'text-icons pointer-events-none': isItFirstPage },
        )}
        renderOnZeroPageCount={null}
      />
    </>
  );
};
