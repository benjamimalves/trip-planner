import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import Input from './elements/Input';
import Label from './elements/Label';

function InputField(props) {
  const { placeholder, id, onKeyUp, className, value } = props;

  return (
    <Label htmlFor={id} className={className}>
      <Input
        id={id}
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        // value={value}
      />
    </Label>
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onKeyUp: PropTypes.func
};

InputField.defaultProps = {
  id: '',
  placeholder: '',
  value: '',
  className: '',
  onKeyUp: false
};

export default InputField;
