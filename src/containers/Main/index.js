/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

// Context API
import MainContext from './context';

// Reducer
import reducer from './reducer';

// Containers
import Address from '../Address';
import MapContainer from '../MapContainer';

// Styled Elements
import MainContainer from './elements/MainContainer';

function Main() {
  const initialState = {
    departure: {},
    destination: {},
    planner: false
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MainContainer>
      <MainContext.Provider value={{ state, dispatch }}>
        <div className="main-elements">
          <Address
            info={state}
            dispatch={dispatch}
            placeholder="Departure from.."
            id="departure"
          />
          <Address
            info={state}
            dispatch={dispatch}
            placeholder="Final destination.."
            id="destination"
          />
        </div>
        <MapContainer dispatch={dispatch} />
      </MainContext.Provider>
    </MainContainer>
  );
}

Main.propTypes = {};

export default Main;
