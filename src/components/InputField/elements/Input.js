import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const Input = styled.input`
  font-size: 1rem;
  border-radius: 19px;
  width: 19.688rem;
  height: 2.875rem;
  padding: 0 38px;
  border: none;
  position: relative;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.4);
  color: ${COLORS.GRAY};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${COLORS.GRAY};
  }
`;

export default Input;
