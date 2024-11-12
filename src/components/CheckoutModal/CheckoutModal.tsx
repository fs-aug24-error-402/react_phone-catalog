import React, { useState, useEffect, useRef } from 'react';
import { getCities, getWarehouses } from '../../../public/api/novaPoshta';
import cn from 'classnames';

import { Button } from '../Button';
import { Loader } from '../Loader';
import { Error } from '../../types/Error';
import {
  validateCardNumber,
  validateCVV,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateValidityPeriod,
} from '../../utils/validation';
import {
  formatCardNumber,
  formatPhoneNumber,
  formatValidityPeriod,
} from '../../utils/formatters';
import { NP } from '../../types/NovaPoshta';

interface Props {
  onClose: () => void;
  onAccept: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ onClose, onAccept }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [cardNumber, setCardNumber] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');
  const [CVV, setCVV] = useState('');

  const [cities, setCities] = useState<NP[]>([]);
  const [selectedCity, setSelectedCity] = useState<NP | null>(null);
  const [foundedCity, setFoundedCity] = useState('');
  const [warehouses, setWarehouses] = useState<NP[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

  const [hasError, setHasError] = useState<Error>(Error.DEFAULT);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInput, setIsInput] = useState({ city: false, warehouse: false });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities(foundedCity);

        setCities(data.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [foundedCity]);

  useEffect(() => {
    if (!selectedCity) {
      return;
    }

    const fetchWarehouses = async () => {
      try {
        const data = await getWarehouses(selectedCity.Ref);

        setWarehouses(data.data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchWarehouses();
  }, [selectedCity]);

  useEffect(() => {
    if (!foundedCity) {
      setSelectedCity(null);
      setWarehouses([]);
      setSelectedWarehouse('');
    }
  }, [foundedCity]);

  const onInput = (type: 'city' | 'warehouse') => {
    setIsInput(prevState => ({
      ...prevState,
      [type]: true,
    }));
  };

  const offInput = (type: 'city' | 'warehouse') => {
    setIsInput(prevState => ({
      ...prevState,
      [type]: false,
    }));
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        offInput('city');
        offInput('warehouse');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let validationError = validateFirstName(firstName);

    if (validationError !== Error.DEFAULT) {
      setHasError(validationError);

      return;
    }

    validationError = validateLastName(lastName);
    if (validationError !== Error.DEFAULT) {
      setHasError(validationError);

      return;
    }

    validationError = validatePhone(phone);
    if (validationError !== Error.DEFAULT) {
      setHasError(validationError);

      return;
    }

    if (paymentMethod === 'card') {
      validationError = validateCardNumber(cardNumber);
      if (validationError) {
        setHasError(validationError);

        return;
      }

      validationError = validateValidityPeriod(validityPeriod);
      if (validationError) {
        setHasError(validationError);

        return;
      }

      validationError = validateCVV(CVV);
      if (validationError) {
        setHasError(validationError);

        return;
      }
    }

    setHasError(Error.DEFAULT);
    setIsSuccessful(true);
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setIsSuccessful(false);
      onAccept();
    }, 2000);
  };

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      formatter?: (value: string) => string,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatter
        ? formatter(e.target.value)
        : e.target.value;

      setter(formattedValue);
      setHasError(Error.DEFAULT);
    };

  const handleClose = () => {
    setPaymentMethod('cash');
    onClose();
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className={cn('flex justify-center text-center', {
              'min-h-full': isSuccessful,
            })}
          >
            <div className="flex flex-col gap-y-8 relative transform overflow-hidden px-16 py-32 rounded-lg bg-white text-left shadow-xl transition-all mobile:my-32 mobile:w-full mobile:max-w-lg">
              {isSuccessful ? (
                <div className="flex flex-col items-center my-auto">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <span className="text-h1-lg text-center text-[#2dbd5a]">
                        Successful order processing!
                      </span>
                      <img
                        src="./img/icons/png/icon-successful.png"
                        alt="successful icon"
                        className="w-[50%]"
                      />
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex gap-16 items-center mb-8">
                    <img
                      className="h-48"
                      src="img/logo-nova-poshta.png"
                      alt="Logo Nova Poshta"
                    />
                    <span className="text-h3">
                      Order delivery by Nova Poshta
                    </span>
                  </div>
                  <div className="border-b border-solid border-elements mb-8" />

                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <h4 className="text-h4 mb-4">Personal information</h4>
                      <div className="grid grid-cols-1 gap-8">
                        <input
                          type="text"
                          placeholder="Petro"
                          className="border border-elements p-8 rounded-sm focus:outline-none focus:border-primary"
                          value={firstName}
                          onChange={handleInputChange(setFirstName)}
                        />
                        {hasError === Error.EMPTY_FIRST_NAME && (
                          <span className="text-red">
                            {Error.EMPTY_FIRST_NAME}
                          </span>
                        )}
                        {hasError === Error.INVALID_FIRST_NAME && (
                          <span className="text-red">
                            {Error.INVALID_FIRST_NAME}
                          </span>
                        )}

                        <input
                          type="text"
                          placeholder="Petrenko"
                          className="border border-elements p-8 rounded-sm focus:outline-none focus:border-primary"
                          value={lastName}
                          onChange={handleInputChange(setLastName)}
                        />
                        {hasError === Error.EMPTY_LAST_NAME && (
                          <span className="text-red">
                            {Error.EMPTY_LAST_NAME}
                          </span>
                        )}
                        {hasError === Error.INVALID_LAST_NAME && (
                          <span className="text-red">
                            {Error.INVALID_LAST_NAME}
                          </span>
                        )}

                        <input
                          type="tel"
                          placeholder="Phone (000) 123-4567"
                          className="border border-elements p-8 rounded-sm focus:outline-none focus:border-primary"
                          value={phone}
                          onChange={handleInputChange(
                            setPhone,
                            formatPhoneNumber,
                          )}
                        />
                        {hasError === Error.EMPTY_PHONE_NUMBER && (
                          <span className="text-red">
                            {Error.EMPTY_PHONE_NUMBER}
                          </span>
                        )}
                        {hasError === Error.INVALID_PHONE_NUMBER && (
                          <span className="text-red">
                            {Error.INVALID_PHONE_NUMBER}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-h4 mb-4">Delivery Address</h4>
                      <div className="grid gap-8 relative">
                        <div>
                          <input
                            list="city"
                            type="text"
                            placeholder="City"
                            className="border border-elements w-full p-8 rounded-sm focus:outline-none focus:border-primary"
                            value={foundedCity}
                            onChange={handleInputChange(setFoundedCity)}
                            onFocus={() => onInput('city')}
                          />
                          {isInput.city && (
                            <div
                              ref={dropdownRef}
                              className="absolute z-12 w-full origin-top-right rounded-md bg-white shadow-lg transition focus:outline-none"
                            >
                              <ul className="flex flex-col gap-4">
                                {cities.slice(0, 5).map(city => (
                                  <li
                                    key={city.Ref}
                                    onClick={() => {
                                      setSelectedCity(city);
                                      setFoundedCity(city.Description);
                                      offInput('city');
                                    }}
                                    className="block px-4 py-4 text-sm w-full border-b hover:bg-elements"
                                  >
                                    {city.Description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Warehouse"
                            className="border border-elements p-8 w-full rounded-sm focus:outline-none focus:border-primary"
                            value={selectedWarehouse}
                            onChange={handleInputChange(setSelectedWarehouse)}
                            onFocus={() => onInput('warehouse')}
                          />

                          {isInput.warehouse && (
                            <div
                              ref={dropdownRef}
                              className="absolute z-11 origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
                            >
                              <ul className="flex flex-col max-h-72 overflow-y-auto border rounded-sm">
                                {warehouses.map(warehouse => (
                                  <li
                                    key={warehouse.Ref}
                                    onClick={() => {
                                      setSelectedWarehouse(
                                        warehouse.Description,
                                      );
                                      offInput('warehouse');
                                    }}
                                    className="block px-4 py-4 text-sm w-full border-b hover:bg-elements"
                                  >
                                    {warehouse.Description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-h4 mb-4">Payment Method</h4>
                      <div className="flex gap-8">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={() => setPaymentMethod('cash')}
                            className="mr-4"
                          />
                          Cash on delivery
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="mr-4"
                          />
                          Payment on site
                        </label>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="mt-8">
                          <input
                            type="text"
                            placeholder="Card number"
                            className="border border-elements p-8 rounded-sm mb-4 w-full focus:outline-none focus:border-primary"
                            value={cardNumber}
                            onChange={handleInputChange(
                              setCardNumber,
                              formatCardNumber,
                            )}
                            required
                          />
                          {hasError === Error.INVALID_CARD_NUMBER && (
                            <span className="text-red">
                              {Error.INVALID_CARD_NUMBER}
                            </span>
                          )}
                          <div className="flex gap-8">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="border border-elements p-8 rounded-sm w-full focus:outline-none focus:border-primary"
                              value={validityPeriod}
                              onChange={handleInputChange(
                                setValidityPeriod,
                                formatValidityPeriod,
                              )}
                              required
                            />
                            {hasError === Error.INVALID_EXPIRY_DATE && (
                              <span className="text-red">
                                {Error.INVALID_EXPIRY_DATE}
                              </span>
                            )}
                            <input
                              type="text"
                              placeholder="CVV"
                              className="border border-elements p-8 rounded-sm w-full focus:outline-none focus:border-primary"
                              value={CVV}
                              maxLength={3}
                              onChange={handleInputChange(setCVV)}
                              required
                            />
                            {hasError === Error.INVALID_CVV && (
                              <span className="text-red">
                                {Error.INVALID_CVV}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-16">
                      <Button
                        children="Close"
                        className="w-full bg-red"
                        onClick={handleClose}
                      />
                      <Button
                        children="Accept Order"
                        type="submit"
                        className="w-full"
                      />
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
