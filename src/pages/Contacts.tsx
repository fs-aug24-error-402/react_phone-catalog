import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import style from '../styles/helpers/container.module.scss';
import './styles/contacts.scss';

export const Contacts = () => {
  return (
    <div className={style.container}>
      <Breadcrumbs className="my-24" />

      <div className="flex justify-center flex-col gap-8">
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
                  <strong>Hours</strong>: 9:00 AM – 6:00 PM (EET), Monday –
                  Friday
                </p>
                <p>
                  <strong>Toll-Free</strong>:
                  <a href="tel:+380800500123" className="hover:underline ml-1">
                    {' '}
                    +38 (0800) 500-123
                  </a>
                </p>
                <p>
                  <strong>Call-Center</strong>:
                  <a href="tel:+380800500647" className="hover:underline ml-1">
                    {' '}
                    +38 (0800) 500-647
                  </a>
                </p>
                <p>
                  <strong>Main Office</strong>:
                  <a href="tel:+380800456346" className="hover:underline ml-1">
                    {' '}
                    +38 (0800) 456-346
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
                    {' '}
                    24 Khreshchatyk St, Kyiv, Ukraine
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
                    {' '}
                    12 Rynok Square, Lviv, Ukraine
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
                    {' '}
                    35 Deribasivska St, Odessa, Ukraine
                  </a>
                </p>
              </div>
            </div>
          </div>

          <form className="mt-13 flex flex-col gap-24 w-full lg:w-1/2">
            <label
              className="font-semibold uppercase label-text"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              // placeholder="Name"
              className="border p-2 rounded py-16 px-16 transition-colors duration-300 hover:border-black"
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              // placeholder="Email"
              className="border p-2 rounded py-16 px-16 transition-colors duration-300 hover:border-black"
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              // placeholder="Phone Number"
              className="border p-2 rounded py-16 px-16 transition-colors duration-300 hover:border-black"
            />

            <label
              className="font-semibold uppercase label-text"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              // placeholder="Message"
              className="mb-8 p-16  h-176 border rounded transition-colors duration-300 ease-in-out hover:border-black"
              required
            ></textarea>

            <Button>Send</Button>
          </form>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21275.773615728995!2d24.68417719567871!3d48.19752957700534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736e5ce63ef1353%3A0x466c1ca1f0a577e6!2z0JrRgNC40LLQvtC_0L7Qu9GM0LUsINCY0LLQsNC90L4t0KTRgNCw0L3QutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNzg3MDY!5e0!3m2!1sru!2sua!4v1731574041265!5m2!1sru!2sua"
          className="w-full h-440 mt-64"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
