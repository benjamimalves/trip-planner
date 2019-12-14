/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

// Util
import { ENDPOINTS } from '../../utils/api';

// Context API
import AppContext from '../../reducer/context';

// Reducer Constants
import { ADD_PLANNER } from '../../reducer/constants';

// Containers
import Address from '../Address';
import MapContainer from '../MapContainer';

// Styled Elements
import MainContainer from './elements/MainContainer';

export class Main extends React.Component {
  componentDidUpdate() {
    const {
      state: { departure, destination, planner }
    } = this.context;

    if (
      !planner &&
      Object.keys(departure).length !== 0 &&
      Object.keys(destination).length !== 0
    ) {
      this.addPlanner();
    }
  }

  addPlanner = () => {
    const {
      state: { departure, destination },
      dispatch
    } = this.context;

    console.log(this.context);

    const REQUESTURL = `${ENDPOINTS.PLANNER}`
      .replace(':startlat', departure.lat)
      .replace(':startlon', departure.lng)
      .replace(':endLat', destination.lat)
      .replace(':endLon', destination.lng)
      .replace(':datetime', '2019-12-15T13:00:00');

    fetch(REQUESTURL)
      .then(data => data.json())
      .then(data => {
        dispatch({
          type: ADD_PLANNER,
          planner: data
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  render() {
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
}

Main.contextType = AppContext;

Main.propTypes = {};

export default Main;
