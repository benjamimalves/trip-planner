import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import Input from './elements/Input';
import Label from './elements/Label';

function InputField(props) {
  const { placeholder, id, onChange, className, value } = props;

  return (
    <Label htmlFor={id} className={className}>
      <Input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </Label>
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
};

InputField.defaultProps = {
  id: '',
  placeholder: '',
  value: '',
  className: '',
  onChange: () => {}
};

export default InputField;
