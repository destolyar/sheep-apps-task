import moment from 'moment'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { DataContext, FromSelectItem, ToSelectItem } from '../../context/context'
import '../../styles/components/exchange.scss'
import { Symbols } from '../../types'
import { FromInput } from './FromInput'
import { FromSelect } from './FromSelect'
import { ToInput } from './ToInput'
import { ToSelect } from './ToSelect'

export const Exchange: React.FunctionComponent = () => {
  let [data, setData] = useState<Symbols[]>([{symbol: 'AEDAUD', name: 'United Arab Emirates dirham - Australian dollar '}]);

  let fromSelectSymbol = useRef<string>('RUB')
  let toSelectSymbol = useRef<string>('USD')

  let [fromInputValue, setFromInputValue] = useState<string>('0')

  let [currentPrice, setCurrentPrice] = useState<number>(0)
  let [priceChange, setPriceChange] = useState<number>(0)

  let [error, setError] = useState<boolean>(false)
  
  
  const onChangeFromInput = (item: string) => {
    setFromInputValue(fromInputValue = item)
  }

  let getData = async() => {
    try {
      const symbolsResponse = await fetch("https://api.finage.co.uk/symbol-list/forex?apikey=API_KEY05HWMNDP6V5GBFB2BTXZGWO8PYLX5G0J").then(data => data.json())
      setData(symbolsResponse.symbols)
      const yesterdayData = moment().subtract(1, 'day').format("YYYY-MM-DD")

      let priceToday: number;
      let priceYesterday: number;

      const pair: string = fromSelectSymbol.current + '' + toSelectSymbol.current

      try {
        const priceYesterdayResponse = await fetch(`https://api.finage.co.uk/history/ticks/forex/${pair}/${yesterdayData}?limit=1&apiKey=API_KEY05HWMNDP6V5GBFB2BTXZGWO8PYLX5G0J`).then(data => data.json())
        const priceTodayResponse = await fetch(`https://api.finage.co.uk/last/forex/${pair}?apikey=API_KEY05HWMNDP6V5GBFB2BTXZGWO8PYLX5G0J`).then(data => data.json())
        
        priceYesterday = priceYesterdayResponse.ticks[0].b
        priceToday = priceTodayResponse.bid
        setError(false)
      } catch {
        priceToday = 666
        priceYesterday = 0
        setError(true)
      }

      setCurrentPrice(priceToday)
      setPriceChange(+(priceToday - priceYesterday).toFixed(4))
    } catch (e){
      console.log(e)
    }
  };

  useEffect(() => {
    getData()
  }, [])

  //Разделяем валютные пары, удаляем повторяющиеся и сортируем.

  let symbols: string[] = []
  symbols = data.map((i) => i.symbol.slice(0, 3))
  symbols = data.map((i) => i.symbol.slice(3, 6))
  symbols = symbols.filter((item, pos) => symbols.indexOf(item) == pos).sort()
 
  console.log(fromSelectSymbol.current + ' ' + toSelectSymbol.current)

  return(
    <DataContext.Provider value={getData}>
      <FromSelectItem.Provider value={fromSelectSymbol}>
        <ToSelectItem.Provider value={toSelectSymbol}>
          <div className="exchange">
            <h1 className='exchange__title'>Exchange money</h1>
            <h1 className='exchange__title' style={{color: 'red'}}>{(error) ? 'Data for this trading pair does not exist, try another pair' : ''}</h1>
            <div className='exchange__selections'>
             <div className='exchange__selections__select'>
                <h2 className="exchange__selections__select__title">From</h2>
                <FromSelect symbols={symbols} defaultValue={fromSelectSymbol.current}/>
              </div>
              <div className='exchange__selections__select'>
                <h2 className="exchange__selections__select__title">To</h2>
                <ToSelect symbols={symbols} defaultValue={toSelectSymbol.current}/>
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
        </ToSelectItem.Provider>
      </FromSelectItem.Provider>
    </DataContext.Provider>
  )
}