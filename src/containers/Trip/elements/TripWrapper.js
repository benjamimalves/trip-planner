import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const TripWrapper = styled.div`
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  time,
  button {
    color: ${COLORS.GRAY};
    font-size: 0.625rem;
  }

  time {
    flex: 0 0 70px;
    align-items: center;
    display: flex;

    svg {
      margin-right: 5px;
    }
  }

  button {
    padding: 0;
    border: none;
  }

  ul {
    height: 160px;
    margin-top: 20px;
    overflow-y: scroll;
  }

  li {
    color: ${COLORS.GRAY};
    font-size: 0.813rem;
    position: relative;
    padding-left: 16px;
    padding-bottom: 15px;

    &:before,
    &:after {
      content: '';
      display: block;
    }

    &:before {
      width: 6px;
      height: 6px;
      position: absolute;
      top: 6px;
      left: 0;
      border-radius: 100%;
      background: ${COLORS.GREEN};
    }

    &:after {
      width: 2px;
      height: 100%;
      position: absolute;
      top: 11px;
      left: 2px;
      background: ${COLORS.GREEN};
    }

    &:last-child:after {
      display: none;
    }

    &.is-inner-step:after {
      opacity: 0.25;
    }
  }
`;

export default TripWrapper;
