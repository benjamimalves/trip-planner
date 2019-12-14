import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const AddressWrapper = styled.div`
  position: relative;

  .address-autocomplete {
    position: absolute;
    width: 100%;
    top: 51px;
    left: 0;
    background-color: ${COLORS.WHITE};
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.4);
    border-radius: 19px;
    z-index: 9;

    li {
      list-style-type: none;
      border-bottom: 1px solid ${COLORS.GRAY};
      padding: 15px;
      font-size: 10px;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export default AddressWrapper;
