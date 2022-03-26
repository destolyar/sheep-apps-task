import { useContext } from "react"
import { DataContext, FromSelectItem } from "../../context/context"
import { SelectProps } from "../../types"


export const FromSelect: React.FunctionComponent<SelectProps> = (props) => {
  const symbolUpdate = useContext(FromSelectItem)
  const getPairInfo = useContext(DataContext)
  return(
    <select className="exchange__selections__select__body" value={symbolUpdate.current} onChange={(e) => {
      symbolUpdate.current = e.target.value
      getPairInfo()
    }}>
      <option className="exchange__selections__select__option" value={props.defaultValue} selected>{props.defaultValue}</option>
      {props.symbols.map((i) => <option className="exchange__selections__select__option" value={i.toString()}>{i}</option>)}
    </select>
  )
}