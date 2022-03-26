import { InputProps } from "../../types";

export const FromInput: React.FunctionComponent<InputProps> = (props) => {
  return(
    <input className="exchange__inputs__input" type="number" defaultValue={400} value={props.fromInputValue} onChange={(e) => {
      props.onChangeFromInput(e.target.value)
      props.onChangeToInput((+e.target.value * props.price).toFixed(2).toString())
    } 
    }/>
  )
}