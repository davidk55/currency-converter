import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Props {
  id: number;
  selectedCurrency: string;
  currencies: any;
  handleSelection: (currencyName: string, id: number) => void;
}
interface Currency {
  name: string;
  symbol: string;
  id: number;
}

function CurrenciesListbox(props: Props) {
  const [currencies, setCurrencies] = useState([] as Currency[]);

  useEffect(() => {
    generateCurrencies();
  }, [props.selectedCurrency, props.currencies]);

  function generateCurrencies() {
    const currs = [];
    for (const [key, val] of Object.entries(props.currencies) as any) {
      currs.push({ id: key, name: val.name, symbol: val.symbol } as Currency);
    }
    setCurrencies(currs);
  }

  return (
    <div className='w-full'>
      <Listbox
        value={props.selectedCurrency}
        onChange={(currencyName) =>
          props.handleSelection(currencyName, props.id)
        }
      >
        <div className='relative mt-1'>
          <Listbox.Button
            className={
              'shadow-mdfocus:outline-none relative w-full cursor-default rounded-lg border border-white bg-gray-700 py-2 pl-3 pr-10 text-left focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
            }
          >
            <span className='block truncate'>{props.selectedCurrency}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {currencies.map((curr, currIdx) => (
                <Listbox.Option
                  key={currIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-800 text-gray-300' : 'text-white'
                    }`
                  }
                  value={`${curr.name} (${curr.id})`}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {`${curr.name} (${curr.id})`}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-700'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default CurrenciesListbox;
