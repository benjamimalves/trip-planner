import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const BookmarksWrapper = styled.div`
  width: 100%;
  padding: 15px;

  h2 {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }
  }

  ul {
    margin-top: 5px;
  }

  p {
    color: ${COLORS.GRAY};
    font-size: 0.813rem;
    margin-top: 15px;
  }

  button {
    border: none;
    border-bottom: 1px solid ${COLORS.GRAY};
    width: 100%;
    text-align: left;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.GREEN};
      color: ${COLORS.WHITE};
    }
  }
`;

export default BookmarksWrapper;
