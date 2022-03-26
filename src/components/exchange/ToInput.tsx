import { InputProps } from "../../types";

export const ToInput: React.FunctionComponent<InputProps> = (props) => {
  return(
    <input className="exchange__inputs__input" type="number" defaultValue={400} value={props.toInputValue} onChange={(e) => {
      props.onChangeToInput(e.target.value)
      props.onChangeFromInput((+e.target.value * props.price).toFixed(2).toString())
    }}/>
  )
}