import styled from 'styled-components';
// import { COLORS } from '../../../utils/colors';

const Button = styled.button`
  cursor: pointer;

  &.is-transparent {
    background-color: transparent;
    border: none;
    text-align: left;
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
