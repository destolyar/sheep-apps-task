export const Select: React.FunctionComponent = () => {
  return(
    <select className="exchange__selections__select__body">
      <option className="exchange__selections__select__option" 
      value="abstractValue" selected>abstractValue1</option>
      <option className="exchange__selections__select__option" 
      value="abstractValue">abstractValue2</option>
      <option className="exchange__selections__select__option" 
      value="abstractValue">abstractValue3</option>
      <option className="exchange__selections__select__option" 
      value="abstractValue">abstractValue4</option>
    </select>
  )
}