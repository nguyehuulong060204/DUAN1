import PropTypes from 'prop-types'

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, onChange, value, onBlur, disabled, defaultValue, ref } = props
  return (
    <div className="form-floating">
      <input
        type={type}
        className={`form-control mt-0 ${i_class}`}
        name={name}
        id={i_id}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        ref={ref}
      />
      <label htmlFor={i_id}>{label}</label>
    </div>
  )
}

CustomInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  i_id: PropTypes.string,
  i_class: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  ref: PropTypes.any
}

export default CustomInput
