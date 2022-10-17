const Checkbox = ({
  county,
  isSelected,
  onCheckboxChange,
  index,
  disabled,
}) => (
  <div className='form-checkbox'>
    <input
      type='checkbox'
      name={county}
      id={`${county}-${index}`}
      data-index={index}
      checked={isSelected}
      onChange={onCheckboxChange}
      disabled={isSelected ? false : disabled}
    />
    <label htmlFor={`${county}-${index}`}>{county}</label>
  </div>
);

export default Checkbox;
