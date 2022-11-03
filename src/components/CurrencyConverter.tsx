import { useEffect, useState } from 'react';
import CurrenciesListbox from './CurrenciesListbox';
import CurrencyService from '../api/CurrencyService';
import util from './../util/Util';

const MAX_INPUT_NUMBER = 100_000_000_000;
const MAX_DIGITS_AFTER_DECIMAL = 2;
const MAX_INPUT_CHARACERS = 16;

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<any>({});
  const [rates, setRates] = useState({});

  const [selectedCurrencies, setSelectedCurrencies] = useState([
    'Euro (EUR)',
    'US Dollar (USD)',
  ]);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    applyCourse();
  }, [selectedCurrencies, inputValue, rates, currencies]);

  useEffect(() => {
    async function setLastestRates() {
      const rates = await CurrencyService.getLatestRates();
      const currencies = await CurrencyService.getCurrencies();

      setRates(rates);
      setCurrencies(currencies);
    }
    setLastestRates();
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const inp = e.target.value;
    if (inp.length > MAX_INPUT_CHARACERS) return;
    if (!util.isNumber(inp)) return;
    if (util.getDigitsAfterDecimal(+inp) > MAX_DIGITS_AFTER_DECIMAL) return;
    if (+inp > MAX_INPUT_NUMBER) return;

    setInputValue(inp);
  }

  function handleSelection(currencyName: string, id: number) {
    setSelectedCurrencies((prevSelectedCurrencies) => {
      const newSelCurrs = [...prevSelectedCurrencies];
      newSelCurrs[id] = currencyName;
      return newSelCurrs;
    });
  }

  return (
    <div className='flex flex-col items-center  gap-12 rounded-xl bg-gray-700 px-28 pt-12 pb-16 text-white'>
      <h1 className='text-3xl font-bold tracking-widest'>Currency Converter</h1>

      <input
        className='w-full rounded-lg border border-black px-3 py-1.5 text-black'
        type='text'
        name='inputValue'
        value={inputValue}
        onChange={handleInput}
      />
      <div className='flex w-full flex-col items-center gap-5'>
        <CurrenciesListbox
          selectedCurrency={selectedCurrencies[0]}
          currencies={currencies}
          handleSelection={handleSelection}
          id={0}
        />

        <button onClick={swapSelectedCurrencies}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
            />
          </svg>
        </button>

        <CurrenciesListbox
          currencies={currencies}
          selectedCurrency={selectedCurrencies[1]}
          handleSelection={handleSelection}
          id={1}
        />
      </div>

      <p className='ml-10 h-10 w-full text-left font-bold'>
      </p>
    </div>
  );
}

export default CurrencyConverter;
