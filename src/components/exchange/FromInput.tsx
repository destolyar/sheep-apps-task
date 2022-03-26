import { InputProps } from "../../types";
import { Input } from "./Input";

export const FromInput: React.FunctionComponent<InputProps> = (props) => {
  return(
    <Input inputValue={props.inputValue} handler={props.handler}/>
  )
}