import styled from 'styled-components';
import { COLORS } from '../../../utils/colors';

const AddressWrapper = styled.div`
  position: relative;

  .btn-geolocation {
    position: absolute;
    right: 7px;
    top: 9px;
    border: none;
    padding: 3px 6px 3px 8px;
    border-left: 1px solid ${COLORS.GRAY};
    cursor: pointer;
  }

  .btn-back {
    font-size: 1rem;
    border-radius: 19px;
    height: 2.875rem;
    padding: 0 18px;
    border: none;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.4);
    color: ${COLORS.GRAY};
    position: absolute;
    right: -99px;
    top: 0;
    cursor: pointer;
  }

  .icon {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .address-autocomplete {
    position: absolute;
    width: 100%;
    max-height: 280px;
    overflow-y: scroll;
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

  .datetime-trigger {
    margin-top: 20px;
  }

  .datetime-picker {
    color: ${COLORS.BLACK};

    .time {
      .sliders {
        .slider {
          .handle {
            &:active,
            &:focus {
              background-color: ${COLORS.GREEN};
              border-color: ${COLORS.GREEN};
              outline: none;
            }
          }
        }
      }
    }
    .calendar {
      .calendar-nav {
        button {
          &.next-month {
            &:after {
              content: '>';
              display: block;
            }
          }
          &.prev-month {
            &:after {
              content: '<';
              display: block;
            }
          }
        }
      }
      table {
        thead {
          th {
            color: ${COLORS.GREEN};
          }
        }
        tbody {
          tr {
            td {
              &.now {
                color: ${COLORS.GREEN};
              }
              &.selected {
                background-color: ${COLORS.GREEN};
                color: ${COLORS.WHITE};
              }
            }
          }
        }
      }
    }
  }

  .datetime-picker-popup {
    margin-top: -360px;

    &:before {
      top: initial;
      transform: rotate(133deg);
      bottom: -6px;
    }
  }
`;

export default AddressWrapper;
