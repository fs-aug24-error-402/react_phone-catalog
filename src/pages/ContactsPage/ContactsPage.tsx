import React, { useState } from 'react';

import { ButtonName, Error, FormFields } from '../../types';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { validateContactForm } from '../../utils/validateContactForm';
import { useTheme } from '../../app/hooks';
import { contactsStartData } from '../../constants/fields';
import { Alert, Snackbar } from '@mui/material';
import cn from 'classnames';

import style from '../../styles/helpers/container.module.scss';
import './ContactsPage.scss';

export const ContactsPage = () => {
  const { isDark } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(contactsStartData);
  const [formErrors, setFormErrors] = useState(contactsStartData);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(formErrors).some(value => value !== Error.DEFAULT)) {
      setErrorType(
        Object.values(formErrors).find(value => value !== Error.DEFAULT)!,
      );
      setIsError(true);

      return;
    }

    if (Object.values(formData).some(value => !value)) {
      setErrorType(Error.EMPTY_FIELDS);
      setIsError(true);

      return;
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 900);
    setTimeout(() => setFormData(contactsStartData), 800);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { id, value } = e.target;
    const error = validateContactForm(id as FormFields, value);

    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [id]: error,
    }));
  }

  return (
    <div className={style.container}>
      <Breadcrumbs className="my-24" />

      <div className="flex justify-center flex-col gap-8">
        {isError && (
          <Snackbar
            open={isError}
            autoHideDuration={3000}
            onClose={() => setIsError(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setIsError(false)}
              severity="error"
              sx={{ width: '100%' }}
            >
              {errorType}
            </Alert>
          </Snackbar>
        )}

        {isError && (
          <Snackbar
            open={isError}
            autoHideDuration={3000}
            onClose={() => setIsError(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setIsError(false)}
              severity="error"
              sx={{ width: '100%' }}
            >
              {errorType}
            </Alert>
          </Snackbar>
        )}
        <h1 className="text-4xl font-bold">Contacts</h1>

        <p className="p-text tracking-wide">
          Heyo! We are located in Kyiv, Odessa, and Lviv. Feel free to use the
          contact form to the right to reach out to us, or write us the
          old-fashioned way. Whether you have a question about our products,
          need assistance with your order, or want to share feedback, we’re
          always here to help.
        </p>

        <div className="gap-16 mt-48 contact-container">
          <div className="flex flex-col gap-32 w-full lg:w-1/2">
            <div className="border-b-2 pb-16 max-w-440">
              <h2 className="font-semibold mb-8">Snail Mail</h2>

              <div className="flex flex-col gap-8">
                <p>Nice Gadgets</p>
                <p>PO Box 45678</p>
                <p>Kyiv, Ukraine, 01001</p>
              </div>
            </div>

            <div className="border-b-2 pb-16 max-w-440">
              <h2 className="text-xl font-semibold mb-8">E-Mail</h2>
              <div className="flex flex-col gap-8">
                <p>
                  <a
                    href="mailto:support@nicegadgets.ua"
                    className="hover:underline"
                  >
                    support@nicegadgets.ua
                  </a>
                </p>

                <p>
                  <a
                    href="mailto:info@nicegadgets.ua"
                    className="hover:underline"
                  >
                    info@nicegadgets.ua
                  </a>
                </p>
              </div>
            </div>

            <div className="border-b-2 pb-16 max-w-440">
              <h2 className="text-xl font-semibold mb-8">Phone Support</h2>
              <div className="flex flex-col gap-8">
                <p>
                  <strong>Hours</strong>: 9:00 – 18:00, Monday – Friday
                </p>

                <p>
                  <strong>Toll-Free</strong>:
                  <a href="tel:+380800500123" className="hover:underline ml-1">
                    {' +38 (0800) 500-123'}
                  </a>
                </p>

                <p>
                  <strong>Call-Center</strong>:
                  <a href="tel:+380800500647" className="hover:underline ml-1">
                    {' +38 (0800) 500-647'}
                  </a>
                </p>

                <p>
                  <strong>Main Office</strong>:
                  <a href="tel:+380800456346" className="hover:underline ml-1">
                    {' +38 (0800) 456-346'}
                  </a>
                </p>
              </div>
            </div>

            <div className="border-b-2 pb-16 max-w-440">
              <h2 className="text-xl font-semibold mb-8">Store Locations</h2>
              <div className="flex flex-col gap-8">
                <p>
                  <strong>Kyiv Main Store</strong>:
                  <a
                    href="https://goo.gl/maps/example1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline ml-1"
                  >
                    {' 24 Khreshchatyk St, Kyiv'}
                  </a>
                </p>

                <p>
                  <strong>Lviv Branch</strong>:
                  <a
                    href="https://goo.gl/maps/example2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline ml-1"
                  >
                    {' 12 Rynok Square, Lviv'}
                  </a>
                </p>

                <p>
                  <strong>Odessa Outlet</strong>:
                  <a
                    href="https://goo.gl/maps/example3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline ml-1"
                  >
                    {' 35 Deribasivska St, Odessa'}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form
            className="mt-13 flex flex-col gap-24 w-full lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <label
              className="font-semibold uppercase label-text"
              htmlFor="name"
            >
              Name
            </label>

            <input
              id={FormFields.NAME}
              type="text"
              value={formData[FormFields.NAME]}
              onChange={handleChange}
              className={cn(
                'border p-2 rounded py-16 px-16 hover:border-icons',
                'transition-colors duration-300 outline-none',
                {
                  'focus:border-primary': !isDark,
                  'bg-surface2 border-surface2 focus:border-accent': isDark,
                },
              )}
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="email"
            >
              Email
            </label>

            <input
              id={FormFields.EMAIL}
              type="email"
              value={formData[FormFields.EMAIL]}
              onChange={handleChange}
              className={cn(
                'border p-2 rounded py-16 px-16 hover:border-icons',
                'transition-colors duration-300 outline-none',
                {
                  'focus:border-primary': !isDark,
                  'bg-surface2 border-surface2 focus:border-accent': isDark,
                },
              )}
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="phone"
            >
              Phone Number
            </label>

            <input
              id={FormFields.PHONE}
              type="text"
              value={formData[FormFields.PHONE]}
              onChange={handleChange}
              className={cn(
                'border p-2 rounded py-16 px-16 hover:border-icons',
                'transition-colors duration-300 outline-none',
                {
                  'focus:border-primary': !isDark,
                  'bg-surface2 border-surface2 focus:border-accent': isDark,
                },
              )}
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="message"
            >
              Message
            </label>

            <textarea
              id={FormFields.MESSAGE}
              value={formData[FormFields.MESSAGE]}
              onChange={handleChange}
              className={cn(
                'p-16 h-[176px] border rounded hover:border-icons',
                'transition-colors duration-300 outline-none',
                {
                  'focus:border-primary': !isDark,
                  'bg-surface2 border-surface2 focus:border-accent': isDark,
                },
              )}
            />

            {isLoading ? (
              <Loader />
            ) : (
              <Button className="m-8" type="submit">
                {ButtonName.SEND}
              </Button>
            )}
          </form>
        </div>
      </div>

      <h2 className="mt-64"> We Are Located Here: </h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21273.03028815314!2d24.67533647554856!3d48.204135262416976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736e5ce63ef1353%3A0x466c1ca1f0a577e6!2z0JrRgNC40LLQvtC_0ZbQu9C70Y8sINCG0LLQsNC90L4t0KTRgNCw0L3QutGW0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNzg3MDY!5e0!3m2!1suk!2sua!4v1731626144416!5m2!1suk!2sua"
        className="w-full rounded-sm h-[440px] mt-24"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
