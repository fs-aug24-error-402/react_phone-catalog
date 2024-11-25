import React, { useState, useEffect, useRef } from 'react';
import { getCities, getWarehouses } from '../../../public/api/novaPoshta';
import cn from 'classnames';

import { Button } from '../Button';
import { Loader } from '../Loader';
import { Error } from '../../types/Error';
import {
  formatCardNumber,
  formatPhoneNumber,
  formatValidityPeriod,
} from '../../utils/formatters';
import { NP } from '../../types/NovaPoshta';
import { FormInput } from '../FormInput/FormInput';
import { validateForm } from '../../utils/validateForm';
import { FormDropdown } from '../FormDropdown/FormDropdown';
import { useTheme } from '../../app/hooks';
import { Snackbar, Alert } from '@mui/material';

interface Props {
  onClose: () => void;
  onAccept: () => void;
}

export const CheckoutModal: React.FC<Props> = ({ onClose, onAccept }) => {
  const { isDark } = useTheme();
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

  const [isError, setIsError] = useState(false);
  const [hasError, setHasError] = useState<Error>(Error.NONE);
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

    const validationError = validateForm(
      firstName,
      lastName,
      phone,
      selectedCity,
      selectedWarehouse,
      paymentMethod,
      cardNumber,
      validityPeriod,
      CVV,
    );

    if (validationError !== Error.NONE) {
      setHasError(validationError);
      setIsError(true);

      return;
    }

    setHasError(Error.NONE);
    setIsSuccessful(true);
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setIsSuccessful(false);
      onAccept();
    }, 2000);
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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity">
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
              {hasError}
            </Alert>
          </Snackbar>
        )}
        <div className="fixed inset-0 z-10 w-screen h-max overflow-auto top-1/2 -translate-y-1/2">
          <div
            className={cn('flex justify-center text-center', {
              'min-h-full': isSuccessful,
            })}
          >
            <div
              className={cn(
                'flex flex-col gap-y-8 px-16 py-32 rounded-lg relative transform overflow-hidden',
                'transform overflow-hidden text-left shadow-xl transition-all mobile:w-full mobile:max-w-lg',
                { 'bg-white': !isDark, 'bg-black': isDark },
              )}
            >
              {isSuccessful ? (
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <span className="text-h1-lg text-center text-[#2dbd5a]">
                        Successful order processing!
                      </span>

                      <img
                        src="img/icons/icon-successful.png"
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

                      <div className="grid grid-cols-1 gap-4">
                        <FormInput
                          placeholder="Petro"
                          value={firstName}
                          setter={setFirstName}
                          hasError={hasError}
                        />

                        <FormInput
                          placeholder="Petrenko"
                          value={lastName}
                          setter={setLastName}
                          hasError={hasError}
                        />

                        <FormInput
                          type="tel"
                          placeholder="Phone (000) 123-4567"
                          value={phone}
                          setter={setPhone}
                          formatter={formatPhoneNumber}
                          hasError={hasError}
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-h4 mb-4">Delivery Address</h4>
                      <div className="relative grid gap-4">
                        <div className="w-full">
                          <FormInput
                            placeholder="City"
                            value={foundedCity}
                            setter={setFoundedCity}
                            onInput={onInput}
                            inputType="city"
                            hasError={hasError}
                          />

                          {isInput.city && (
                            <div
                              ref={dropdownRef}
                              className={cn(
                                'absolute z-12 w-full origin-top-right rounded-sm shadow-lg transition focus:outline-none',
                                { 'bg-white': !isDark, 'bg-black': isDark },
                              )}
                            >
                              <FormDropdown
                                items={cities}
                                onSelect={city => {
                                  setSelectedCity(city);
                                  setFoundedCity(city.Description);
                                }}
                                onClose={() => offInput('city')}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <FormInput
                            placeholder="Warehouse"
                            value={selectedWarehouse}
                            setter={setSelectedWarehouse}
                            onInput={onInput}
                            inputType="warehouse"
                            hasError={hasError}
                          />

                          {isInput.warehouse && (
                            <div
                              ref={dropdownRef}
                              className={cn(
                                'absolute z-11 origin-top-right rounded-sm shadow-lg focus:outline-none',
                                { 'bg-white': !isDark, 'bg-black': isDark },
                              )}
                            >
                              <FormDropdown
                                items={warehouses}
                                onSelect={warehouse => {
                                  setSelectedWarehouse(warehouse.Description);
                                }}
                                onClose={() => offInput('warehouse')}
                              />
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
                        <div className="grid grid-cols-2 gap-4 mt-8">
                          <FormInput
                            placeholder="Card number"
                            value={cardNumber}
                            className="col-span-2"
                            setter={setCardNumber}
                            formatter={formatCardNumber}
                            hasError={hasError}
                          />

                          <FormInput
                            placeholder="MM/YY"
                            value={validityPeriod}
                            setter={setValidityPeriod}
                            formatter={formatValidityPeriod}
                            hasError={hasError}
                          />

                          <FormInput
                            placeholder="CVV"
                            value={CVV}
                            setter={setCVV}
                            hasError={hasError}
                            maxLength={3}
                          />
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
