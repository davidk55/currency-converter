import CurrenciesListbox from './CurrenciesListbox';
function CurrencyConverter() {
  return (
    <div className='flex flex-col items-center  gap-12 rounded-xl bg-gray-700 px-28 pt-12 pb-16 text-white'>
      <h1 className='text-3xl font-bold tracking-widest'>Currency Converter</h1>
      <input
        className='w-full rounded-lg border border-black px-3 py-1.5 text-black'
        onChange={handleInput}
      />
      <div className='flex w-full flex-col items-center gap-5'>
        <CurrenciesListbox
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
          handleSelection={handleSelection}
        />
      </div>
      <p className='ml-10 h-10 w-full text-left font-bold'>
      </p>
    </div>
  );
}

export default CurrencyConverter;
