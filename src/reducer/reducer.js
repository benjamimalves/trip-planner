/* eslint-disable no-param-reassign */
import {
  ADD_DATETIME,
  ADD_DEPARTURE,
  ADD_DESTINATION,
  ADD_PLANNER
} from './constants';
import { getBestETA } from '../utils/utils';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DATETIME:
      return { ...state, datetime: action.datetime };
    case ADD_DEPARTURE:
      return { ...state, departure: action.address, planner: false };
    case ADD_DESTINATION:
      return { ...state, destination: action.address, planner: false };
    case ADD_PLANNER:
      return { ...state, planner: getBestETA(action.planner) };
    default:
      throw new Error();
  }
};

export default reducer;
