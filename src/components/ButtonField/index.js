import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import Button from './elements/Button';

function ButtonField(props) {
  const { id, type, children, className, onClick } = props;

  return (
    <Button type={type} id={id} className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

ButtonField.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

ButtonField.defaultProps = {
  id: '',
  type: 'button',
  className: '',
  children: null,
  onClick: () => {}
};

export default ButtonField;
