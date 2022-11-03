import CurrencyConverter from './CurrencyConverter';
import Attribution from './Attribution';

function App() {
  return (
    <div className=' flex h-screen flex-col items-center justify-between bg-gray-800'>
      <CurrencyConverter />
      <Attribution />
    </div>
  );
}

export default App;
