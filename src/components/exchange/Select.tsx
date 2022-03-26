import { SelectProps } from "../../types"

export const Select: React.FunctionComponent<SelectProps> = (props) => {
  return(
    <select className="exchange__selections__select__body" onChange={(e) => props.handler(e.target.value)}>
      <option className="exchange__selections__select__option" value={props.defaultValue} selected>{props.defaultValue}</option>
      {props.symbols.map((i) => <option className="exchange__selections__select__option" value={i.toString()}>{i}</option>)}
    </select>
  )
}