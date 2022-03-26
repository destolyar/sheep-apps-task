import moment from 'moment'
import { useEffect, useState } from 'react'
import '../../styles/components/exchange.scss'
import { Symbols } from '../../types'
import { FromInput } from './FromInput'
import { FromSelect } from './FromSelect'
import { ToInput } from './ToInput'
import { ToSelect } from './ToSelect'

export const Exchange: React.FunctionComponent = () => {
  let [data, setData] = useState<Symbols[]>([{symbol: 'AEDAUD', name: 'United Arab Emirates dirham - Australian dollar '}]);

  let [toSelectSymbol, setToSelectSymbol] = useState<string>('USD')
  let [fromSelectSymbol, setFromSelectSymbol] = useState<string>('RUB')

  let [fromInputValue, setFromInputValue] = useState<string>('0')

  let [currentPrice, setCurrentPrice] = useState<number>(0)
  let [priceChange, setPriceChange] = useState<number>(0)

  //Хендлеры для изменения состояния(Я знаю что эту задачу можно решить с помощью  Redux или useContext, но это показалось мне более простым решением.)

  const onChangeToSelect = (item: string) => {
    setToSelectSymbol(item)
  }

  const onChangeFromSelect = (item:string) => {
    setFromSelectSymbol(item)
  }

  const onChangeFromInput = (item: string) => {
    setFromInputValue(item)
  }

  useEffect(() => {
    const getSymbols = async () => {
      const data = await fetch("https://api.finage.co.uk/symbol-list/forex?apikey=API_KEY043SFLMT8TUBQN4APKJC7P0AVC8LX07I").then(data => data.json())
      setData(data.symbols)
    }

    const getPrice = async () => {
      const currentData = moment().subtract(1, 'day').format("YYYY-MM-DD")
      const priceYesterdayResponse = await fetch(`https://api.finage.co.uk/history/ticks/forex/${toSelectSymbol + fromSelectSymbol}/${currentData}?limit=1&apiKey=API_KEY043SFLMT8TUBQN4APKJC7P0AVC8LX07I`).then(data => data.json())
      const priceTodayResponse = await fetch(`https://api.finage.co.uk/last/forex/${toSelectSymbol + fromSelectSymbol}?apikey=API_KEY043SFLMT8TUBQN4APKJC7P0AVC8LX07I`).then(data => data.json())
      const priceToday: number = priceTodayResponse.bid
      const priceYesterday: number = priceYesterdayResponse.ticks[0].b
      setCurrentPrice(priceToday)
      setPriceChange(+(priceToday - priceYesterday).toFixed(4))
    }

    getSymbols()
    getPrice()
  }, [])

  //Разделяем валютные пары, удаляем повторяющиеся и сортируем.

  let symbols: string[] = []
  symbols = data.map((i) => i.symbol.slice(0, 3))
  symbols = data.map((i) => i.symbol.slice(3, 6))
  symbols = symbols.filter((item, pos) => symbols.indexOf(item) == pos).sort()

  console.log(currentPrice)
  console.log(priceChange)
  
  return(
    <div className="exchange">
      <h1 className='exchange__title'>Exchange money</h1>
      <div className='exchange__selections'>
        <div className='exchange__selections__select'>
          <h2 className="exchange__selections__select__title">From</h2>
          <ToSelect symbols={symbols} handler={onChangeToSelect}/>
        </div>
        <div className='exchange__selections__select'>
          <h2 className="exchange__selections__select__title">To</h2>
          <FromSelect symbols={symbols} handler={onChangeFromSelect}/>
        </div>
      </div>
      <div className='exchange__inputs'>
        <FromInput inputValue={fromInputValue} handler={onChangeFromInput}/>
        <ToInput inputValue={fromInputValue} price={currentPrice}/>
      </div>
      <div className='exchange__swap-info'>
        <button className='exchange__swap-info__button'>Swap</button>
        <div className='exchange__swap-info__info-block-container'>
          <div className='exchange__swap-info__info-block-container__info-block'>
            <p className='exchange__swap-info__info-block-container__info-block__title'>Current price</p>
            <h2 className='exchange__swap-info__info-block-container__info-block__value'>{currentPrice}</h2>
          </div>
          <div className='exchange__swap-info__info-block-container__info-block'>
            <p className='exchange__swap-info__info-block-container__info-block__title'>Today's change</p>
            <h2 className='exchange__swap-info__info-block-container__info-block__value' style={{color: (priceChange > 0) ? 'green' : 'red'}}>{priceChange}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}