/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

// Containers
import Address from '../Address';
import MapContainer from '../MapContainer';

// Styled Elements
import MainContainer from './elements/MainContainer';

function Main() {
  return (
    <MainContainer>
      <div className="main-elements">
        <Address placeholder="Departure from.." id="departure" />
        <div className="main-elements-widget">
          <Address
            placeholder="Final destination.."
            id="destination"
            className="second-type"
          />
        </div>
      </div>
      <MapContainer />
    </MainContainer>
  );
}

Main.propTypes = {};

export default Main;
