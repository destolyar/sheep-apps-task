import '../../styles/components/exchange.scss'
import { Input } from './Input'
import { Select } from './Select'

export const Exchange: React.FunctionComponent = () => {
  return(
    <div className="exchange">
      <h1 className='exchange__title'>Exchange money</h1>
      <div className='exchange__selections'>
        <div className='exchange__selections__select'>
          <h2 className="exchange__selections__select__title">From</h2>
          <Select/>
        </div>
        <div className='exchange__selections__select'>
          <h2 className="exchange__selections__select__title">To</h2>
          <Select/>
        </div>
      </div>
      <div className='exchange__inputs'>
        <Input/>
        <Input/>
      </div>
      <div className='exchange__swap-info'>
        <button className='exchange__swap-info__button'>Swap</button>
        <div className='exchange__swap-info__info-block-container'>
          <div className='exchange__swap-info__info-block-container__info-block'>
            <p className='exchange__swap-info__info-block-container__info-block__title'>Current price</p>
            <h2 className='exchange__swap-info__info-block-container__info-block__value'>42$</h2>
          </div>
          <div className='exchange__swap-info__info-block-container__info-block'>
            <p className='exchange__swap-info__info-block-container__info-block__title'>Today's change</p>
            <h2 className='exchange__swap-info__info-block-container__info-block__value'>42$</h2>
          </div>
        </div>
      </div>
    </div>
  )
}