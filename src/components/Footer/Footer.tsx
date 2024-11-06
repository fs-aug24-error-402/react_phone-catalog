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
        <img src="public/img/logo.png" alt="Nice Gadgets Logo" />
      </div>

      <ul
        className="flex flex-col gap-y-16 uppercase
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

      <div className="flex items-center justify-center tablet:justify-end">
        <span className="mr-8 font-semibold">Back to top</span>

        <button
          className="p-4 border border-secondary rounded-full cursor-pointer transition-transform duration-200 hover:border-primary hover:scale-110"
          onClick={handleScrollToTop}
        >
          <img
            src="public/img/icons/svg/icon-arrow-top.svg"
            alt="icon arrow top"
          />
        </button>
      </div>
    </footer>
  );
};
