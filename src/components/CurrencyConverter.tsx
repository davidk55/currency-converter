import { useEffect, useState } from 'react';
import CurrenciesListbox from './CurrenciesListbox';
import CurrencyService from '../api/CurrencyService';
import util from './../util/Util';

const MAX_INPUT_NUMBER = 100_000_000_000;
const MAX_DIGITS_AFTER_DECIMAL = 2;
const MAX_INPUT_CHARACERS = 16;

interface Currency {
  shortName: string;
  fullName: string;
  symbol: string;
  rate: string;
}

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [selectedCurrencies, setSelectedCurrencies] = useState([
    'Euro (EUR)',
    'US Dollar (USD)',
  ]);

  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    applyCourse();
  }, [selectedCurrencies, inputValue, currencies]);

  useEffect(() => {
    async function generateCurrencies() {
      const fetchedRates = await CurrencyService.getLatestRates();
      const fetchedCurrencies = await CurrencyService.getCurrencies();

      let currencies = [] as Currency[];
      for (const [key, val] of Object.entries(fetchedCurrencies) as any) {
        const cur = {
          shortName: key,
          fullName: val.name,
          symbol: val.symbol,
          rate: '0',
        };
        currencies.push(cur);
      }
      for (const [key, val] of Object.entries(fetchedRates) as any) {
        currencies = currencies.map((cur) => {
          if (cur.shortName === key) return { ...cur, rate: val };
          return cur;
        });
      }

      const cleanCurrencies = removeCurrenciesWithNoRates(currencies);
      const sortedCurrencies = sortByShortName(cleanCurrencies);
      setCurrencies(sortedCurrencies);
    }
    generateCurrencies();
  }, []);

  function sortByShortName(currencies: Currency[]) {
    return currencies.sort((firstCurr, secondCurr) =>
      firstCurr.shortName.localeCompare(secondCurr.shortName)
    );
  }

  function removeCurrenciesWithNoRates(currencies: Currency[]) {
    return currencies.filter((currency) => currency.rate != '0');
  }

  function getMatchingCurrency(currencyShortName: string) {
    const filteredCurrencies = currencies.filter((currency) => {
      return currency.shortName == currencyShortName;
    });

    if (filteredCurrencies.length == 1) return filteredCurrencies[0];
    else return undefined;
  }

  function applyCourse() {
    const selCurrFrom = util.extractStringInBrackets(selectedCurrencies[0]);
    if (!selCurrFrom) return;
    const matchedCurrFrom = getMatchingCurrency(selCurrFrom);
    if (!matchedCurrFrom) return;

    const rateFrom = matchedCurrFrom.rate;

    const selCurrTo = util.extractStringInBrackets(selectedCurrencies[1]);
    if (!selCurrTo) return;
    const matchedCurrTo = getMatchingCurrency(selCurrTo);
    if (!matchedCurrTo) return;

    const rateTo = matchedCurrTo.rate;

    const outp = (+inputValue / +rateFrom) * +rateTo;

    if (!outp) {
      setOutputValue('');
      return;
    }

    setOutputValue(outp.toFixed(MAX_DIGITS_AFTER_DECIMAL).toString());
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const inp = e.target.value;
    if (inp.length > MAX_INPUT_CHARACERS) return;
    if (!util.isNumber(inp)) return;
    if (util.getDigitsAfterDecimal(+inp) > MAX_DIGITS_AFTER_DECIMAL) return;
    if (+inp > MAX_INPUT_NUMBER) return;

    setInputValue(inp);
  }

  function swapSelectedCurrencies() {
    setSelectedCurrencies((prevSelectedCurrencies) => {
      return [prevSelectedCurrencies[1], prevSelectedCurrencies[0]];
    });
  }

  function handleSelection(currencyName: string, id: number) {
    setSelectedCurrencies((prevSelectedCurrencies) => {
      const newSelCurrs = [...prevSelectedCurrencies];
      newSelCurrs[id] = currencyName;
      return newSelCurrs;
    });
  }

  return (
    <div className='m-auto flex flex-col items-center gap-12 rounded-xl bg-gray-700 px-28 pt-12 pb-16 text-white'>
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
        {outputValue != '' ? `${outputValue} ${selectedCurrencies[1]}` : ''}
      </p>
    </div>
  );
}

export default CurrencyConverter;
