export interface Symbols {
  name: string,
  symbol: string
}

export interface SelectProps {
  symbols: string[],
  defaultValue: string,
}

export interface InputProps {
  inputValue: string,
  handler?: (item: string) => void
  price?: number
}


