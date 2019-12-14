import React from 'react';
import PropTypes from 'prop-types';

// Styled Elements
import H2Styled from './elements/H2';

function H2(props) {
  const { children } = props;

  return <H2Styled>{children}</H2Styled>;
}

H2.propTypes = {
  children: PropTypes.node
};

H2.defaultProps = {
  children: null
};

export default H2;
