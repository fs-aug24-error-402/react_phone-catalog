import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';

interface Props {
  lastItem?: string;
}

export const Breadcrumbs: FC<Props> = ({ lastItem }) => {
  const pathname = useLocation().pathname;
  const names = pathname.split('/').filter(item => item.length > 0);

  if (lastItem) {
    names.splice(names.length - 1, 1, lastItem);
  }

  return (
    <nav>
      <ul className="inline-flex items-center gap-8">
        <li>
          <Link to="/">
            <img
              src="img/icons/svg/icon-home.svg"
              alt="Home icon"
              className="h-16 aspect-square"
            />
          </Link>
        </li>

        {names.map((name, index) => (
          <li key={name} className="flex items-center gap-8">
            <img
              src="img/icons/svg/icon-arrow-right.svg"
              alt="Home icon"
              className="h-16 aspect-square"
            />

            <Link
              to={`/${names.slice(0, index + 1).join('/')}`}
              className={cn(
                'text-small leading-2 capitalize hover:text-primary',
                {
                  'text-secondary': index !== 0,
                  'overflow-hidden whitespace-nowrap text-ellipsis':
                    index === names.length - 1,
                },
              )}
            >
              {name.replaceAll('-', ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
