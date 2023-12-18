import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(0);
  const [myCoin, setMyCoin] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json)
      setLoading(false)
    })
  }, [])

  const writeMoney = (res) => {
    setMyMoney(res.target.value)
  }

  const selectCoin = (res) => {
    setMyCoin(res.target.value)
  }

  return (
  <div>
    <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
    <div>
      <input type="number" value={myMoney} onChange={writeMoney} placeholder='Write your Money'/>USD
    </div>
    {loading ? <strong>Loading...</strong> : 
    
    <select onChange={selectCoin}>
      {coins.map((coin, index) => (
        <option key={index} value={coin.quotes.USD.price}>
          {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(2)} USD
        </option>
      ))}
    </select>}
    <div>
      <h2>Coins You Can Buy : {myCoin > 0 ? `(${(myMoney / myCoin).toFixed(2)}${coins.symbol}` : null}</h2>
    </div>
  </div>
  )
}

export default App
