import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import Input from './elements/Input';
import Label from './elements/Label';

function InputField(props) {
  const { placeholder, id, onChange, className, value, readOnly } = props;

  return (
    <Label htmlFor={id} className={className}>
      <Input
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
      />
    </Label>
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

InputField.defaultProps = {
  id: '',
  placeholder: '',
  value: '',
  className: '',
  readOnly: false,
  onChange: () => {}
};

export default InputField;
