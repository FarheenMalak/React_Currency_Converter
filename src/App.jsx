import Input from './components/Input'
import useCurrencyInfo from './hooks/useCurrencyinfo';
import { useState } from 'react';
import Swal from 'sweetalert2'
function App() {
  const[amount,setAmount] = useState()
  const [from,setFrom] =useState("usd");
  const [to,setTo] = useState('pkr');
  const [convertCurrency,setConvertCurrency] = useState()


  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo)
  
  
  const convert = () =>{
    if(!amount){
      Swal.fire({
        title: 'Error!',
        text: 'Add a value to convert',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
    setConvertCurrency(amount * currencyInfo[to].toFixed(2))
  }}
  const swap = () =>{
    setTo(from);
    setFrom(to)
    setConvertCurrency(amount)
    setAmount(amount)
  }

  return (
    <>
     <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
    >
      <h1 className='text-5xl font-semibold text-gray-700' >Currency-Converter</h1>
        <div className="w-full">
            <div className="w-full max-w-md my-1 mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()                    
                    }}
                >
                    <div className="w-full mb-1">
                        <Input
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(amount) => setAmount(amount)}
                            selectedCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-gray-500 text-white px-2 py-0.5 hover:bg-slate-50 hover:text-gray-500 hover:border-gray-500 hover:border-2 "
                            onClick={swap}
                        >
                            swap
                       </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <Input
                            label="To"
                            amount={convertCurrency}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectedCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-slate-50 hover:text-gray-500 hover:border-gray-500 hover:border-2">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default App
