import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const MainContainer = styled.div`
  .main-elements {
    height: 100vh;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div:first-child {
      margin-top: 35px;
    }
  }

  .main-elements-widget {
    width: 380px;
    height: 325px;
    padding: 30px;
    border-radius: 19px 19px 0 0;
    position: absolute;
    bottom: 0;
    background-color: ${COLORS.WHITE};
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.4);

    .address-autocomplete {
      top: initial;
      bottom: 205px;
    }
  }
`;

export default MainContainer;
