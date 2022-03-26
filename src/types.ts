export interface Symbols {
  name: string,
  symbol: string
}

export interface SelectProps {
  symbols: string[],
  defaultValue?: string,
  handler: (item: string) => void
}

export interface InputProps {
  inputValue: string,
  handler: (item: string) => void
}


