import { Link } from 'react-router-dom';
import { FiChevronUp } from 'react-icons/fi';

import cn from 'classnames';
import { useTheme } from '../../app/hooks';
import { handleScrollToTop } from '../../utils/utils';
import { ButtonSmall } from '../ButtonSmall';

export const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className={cn(
        'flex bottom-0 flex-col gap-y-32 w-full px-16 py-32',
        'text-small',
        'tablet:grid tablet:grid-cols-3 tablet:h-96 tablet:px-32 desktop:px-152',
        {
          'bg-white text-secondary shadow-footer-top': !isDark,
          'bg-black border-t border-elements text-white': isDark,
        },
      )}
    >
      <div>
        <img
          src={isDark ? 'img/logo-dark.svg' : 'img/logo.svg'}
          alt="Nice Gadgets Logo"
          className="h-32"
        />
      </div>

      <ul
        className="flex flex-col gap-y-16 text-uppercase uppercase
          tablet:flex-row tablet:justify-between tablet:items-center"
      >
        <li
          className={cn('transition-colors duration-300', {
            'hover:text-primary': !isDark,
            'hover:text-accent': isDark,
          })}
        >
          <Link
            to="https://github.com/fs-aug24-error-402/react_phone-catalog"
            target="_blank"
          >
            Github
          </Link>
        </li>

        <li
          className={cn('transition-colors duration-300', {
            'hover:text-primary': !isDark,
            'hover:text-accent': isDark,
          })}
        >
          <Link to="/contacts" onClick={handleScrollToTop}>
            Contacts
          </Link>
        </li>

        <li
          className={cn('transition-colors duration-300', {
            'hover:text-primary': !isDark,
            'hover:text-accent': isDark,
          })}
        >
          <Link to="/rights" onClick={handleScrollToTop}>
            Rights
          </Link>
        </li>
      </ul>

      <div
        className="flex items-center justify-center tablet:w-max
        tablet:justify-self-end transition-all duration-300
        text-secondary hover:text-primary hover:border-primary group"
        onClick={handleScrollToTop}
      >
        <span className="mr-8 text-small">Back to top</span>

        <ButtonSmall
          className={cn('h-32 w-32 group-hover:scale-110', {
            'group-hover:border-primary': !isDark,
            'group-hover:bg-icons group-hover:border-none': isDark,
          })}
        >
          <FiChevronUp color="var(--color-primary)" className="h-16 w-16" />
        </ButtonSmall>
      </div>
    </footer>
  );
};
