import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { getFilteredDevices } from '../../utils/utils';
import { getSearchWith } from '../../utils/searchHelper';
import { useWindowWidth } from '../../app/hooks';

interface Props {
  items: Product[];
}

export const PaginatedItems: FC<Props> = ({ items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useWindowWidth();

  const displayedPagesRange = isMobile ? 3 : 5;

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
        className="flex items-center gap-8 justify-center"
        pageLinkClassName="flex items-center justify-center border
          rounded-[50%] h-32 w-32 leading-none text-center text-none
          hover:border-primary"
        activeLinkClassName="bg-primary border-primary text-white
          pointer-events-none"
        breakLinkClassName="pointer-events-none"
        breakLabel={
          <button
            disabled
            className="flex items-center pointer-events-none justify-center
            border rounded-full hover:border-primary h-32 w-32"
          >
            ...
          </button>
        }
        nextLabel={
          <img
            src={
              isItLastPage
                ? 'img/icons/svg/icon-arrow-right-inactive.svg'
                : 'img/icons/svg/icon-arrow-right.svg'
            }
          />
        }
        nextLinkClassName={classNames(
          'flex justify-center items-center ml-8 rounded-full border',
          'border-icons hover:border-primary h-32 w-32',
          { 'pointer-events-none': isItLastPage },
        )}
        onPageChange={handlePageClick}
        pageRangeDisplayed={displayedPagesRange}
        pageCount={pageCount}
        previousLabel={
          <img
            src={
              isItFirstPage
                ? 'img/icons/svg/icon-arrow-left-inactive.svg'
                : 'img/icons/svg/icon-arrow-left.svg'
            }
          />
        }
        previousLinkClassName={classNames(
          'flex justify-center items-center ml-8 rounded-full border',
          'border-icons hover:border-primary h-32 w-32',
          { 'pointer-events-none': isItFirstPage },
        )}
        renderOnZeroPageCount={null}
      />
    </>
  );
};
