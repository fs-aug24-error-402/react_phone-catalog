import React, { useEffect, useState } from 'react';
import { Error } from '../../types/Error';

interface ErrorToastProps {
  message: Error;
  onClose: () => void;
}

export const FormError: React.FC<ErrorToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`absolute z-20 top-4 right-4 max-w-xs p-8 bg-red text-white rounded-sm shadow flex items-center space-x-8
      ${isVisible ? 'opacity-100' : 'opacity-0 transition-opacity duration-500'}`}
      role="alert"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-sm text-red">
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </svg>
      </div>
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-200 hover:text-white focus:outline-none"
        aria-label="Close"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
