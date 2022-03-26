import { InputProps } from "../../types"

export const Input: React.FunctionComponent<InputProps> = (props) => {
  return(
    <input className="exchange__inputs__input" type="number" defaultValue={400} value={props.inputValue} onChange={(e) => props.handler(e.target.value)}/>
  )
}