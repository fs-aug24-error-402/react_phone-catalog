import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import cn from 'classnames';

interface Props {
  className?: string;
}

export const Breadcrumbs: FC<Props> = ({ className }) => {
  const pathname = useLocation().pathname;
  const names = pathname.split('/').filter(item => item.length > 0);

  return (
    <nav className={className}>
      <ul className="inline-flex items-center gap-8">
        <li>
          <Link to="/">
            <FiHome className="h-16 w-16 hover:text-accent transition-colors duration-300 ease-in-out" />
          </Link>
        </li>

        {names.map((name, index) => {
          const isLast = index === names.length - 1;

          return (
            <li
              key={name}
              className={cn(
                'flex items-center gap-8',
                'hover:text-accent transition-colors duration-300 ease-in-out',
                { 'pointer-events-none': isLast },
              )}
            >
              <FiChevronRight className="h-16 w-16 text-secondary" />

              <Link
                to={`/${names.slice(0, index + 1).join('/')}`}
                className={cn('text-small leading-2 capitalize', {
                  'text-secondary overflow-hidden whitespace-nowrap text-ellipsis':
                    isLast,
                })}
              >
                {name.replaceAll('-', ' ')}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
