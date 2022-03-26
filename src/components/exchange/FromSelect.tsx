import { SelectProps } from "../../types";
import { Select } from "./Select";

export const FromSelect: React.FunctionComponent<SelectProps> = (props) => {
  return(
    <Select symbols={props.symbols} handler={props.handler} defaultValue="RUB"/>
  )
}