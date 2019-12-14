import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const Label = styled.label`
  position: relative;
  display: block;

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${COLORS.WHITE};
    z-index: 9;
    bottom: -5px;
    position: absolute;
    margin-left: calc(50% - 5px);
  }

  &.second-type {
    &:after {
      display: none;
    }

    input {
      box-shadow: none;
      border: 1px solid ${COLORS.GRAY};
    }
  }
`;

export default Label;
