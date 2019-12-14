import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import Input from './elements/Input';
import Label from './elements/Label';

function InputField(props) {
  const { placeholder, id, onKeyUp, value } = props;

  return (
    <Label htmlFor={id}>
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
  onKeyUp: PropTypes.func
};

InputField.defaultProps = {
  id: '',
  placeholder: '',
  value: '',
  onKeyUp: false
};

export default InputField;
