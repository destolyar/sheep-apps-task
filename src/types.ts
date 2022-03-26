export interface Symbols {
  name: string,
  symbol: string
}

export interface SelectProps {
  symbols: string[],
  defaultValue: string,
}

export interface InputProps {
  fromInputValue: string,
  toInputValue: string,
  onChangeFromInput: (item: string) => void,
  onChangeToInput: (item: string) => void,
  price: number
}


