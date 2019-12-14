/* eslint-disable no-param-reassign */
import { ADD_DEPARTURE, ADD_DESTINATION } from './constants';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_DEPARTURE:
      return { ...state, departure: action.address };
    case ADD_DESTINATION:
      return { ...state, destination: action.address };
    default:
      throw new Error();
  }
};

export default reducer;
