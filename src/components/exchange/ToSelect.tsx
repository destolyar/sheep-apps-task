import { useContext } from "react"
import { DataContext, ToSelectItem } from "../../context/context"
import { SelectProps } from "../../types"


export const ToSelect: React.FunctionComponent<SelectProps> = (props) => {
  const symbolUpdate = useContext(ToSelectItem)
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