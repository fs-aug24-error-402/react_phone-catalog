import { useCallback } from 'react';

export const Footer = () => {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer
      className="flex bottom-0 flex-col gap-y-32 w-full px-16 py-32
        text-small text-secondary shadow-footer-top
        tablet:grid tablet:grid-cols-3 tablet:h-96 tablet:px-32 desktop:px-152"
    >
      <div className="">
        <img src="public/img/logo.svg" alt="Nice Gadgets Logo" />
      </div>

      <ul
        className="flex flex-col gap-y-16 text-uppercase uppercase
          tablet:flex-row tablet:justify-between tablet:items-center"
      >
        <li className="transition-colors duration-300 hover:text-primary">
          <a
            href="https://github.com/fs-aug24-error-402/react_phone-catalog"
            className=""
            target="_blank"
          >
            Github
          </a>
        </li>

        <li className="transition-colors duration-300 hover:text-primary">
          <a href="#" className="" target="_blank">
            Contacts
          </a>
        </li>

        <li className="transition-colors duration-300 hover:text-primary">
          <a href="#" className="" target="_blank">
            Rights
          </a>
        </li>
      </ul>

      <button
        className="flex items-center justify-center tablet:w-max tablet:justify-self-end
             transition-transform duration-200 hover:text-primary hover:border-primary group"
        onClick={handleScrollToTop}
      >
        <span className="mr-8 font-semibold">Back to top</span>
        <img
          src="public/img/icons/svg/icon-arrow-top.svg"
          alt="icon arrow top"
          className="p-4 border border-secondary rounded-full transition-colors duration-200 group-hover:border-primary group-hover:scale-110"
        />
      </button>
    </footer>
  );
};
