import { InputProps } from "../../types";
import { Input } from "./Input";

export const ToInput: React.FunctionComponent<InputProps> = (props) => {
  return(
    <Input inputValue={(props.price) ? (+props.inputValue * +props.price).toFixed(2).toString() : props.inputValue} handler={props.handler}/>
  )
}