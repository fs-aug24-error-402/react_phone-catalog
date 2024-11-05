export const FooterWithTail = () => {
  return (
    <footer className="flex gap-10">
      <div className="">
        <img src="src/images/logo.png" alt="Nice Gadgets Logo" />
      </div>

      <ul className="">
        <li className="text-green-500">
          <a
            href="https://github.com/fs-aug24-error-402/react_phone-catalog"
            className=""
            target="_blank"
          >
            Github
          </a>
        </li>
        <li className="">
          <a href="#" className="text-red-700" target="_blank">
            Contacts
          </a>
        </li>
        <li className="">
          <a href="#" className="" target="_blank">
            Rights
          </a>
        </li>
      </ul>

      <div className="">
        <span className="">Back to top</span>
        <button className="">
          <img src="src/images/icons/icon-arrow-top.svg" alt="icon arrow top" />
        </button>
      </div>
    </footer>
  );
};
