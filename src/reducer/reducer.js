/* eslint-disable no-param-reassign */
import { ADD_DEPARTURE, ADD_DESTINATION, ADD_PLANNER } from './constants';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DEPARTURE:
      return { ...state, departure: action.address, planner: false };
    case ADD_DESTINATION:
      return { ...state, destination: action.address, planner: false };
    case ADD_PLANNER:
      console.log('action :: ', action);
      return { ...state, planner: action.planner };
    default:
      throw new Error();
  }
};

export default reducer;
