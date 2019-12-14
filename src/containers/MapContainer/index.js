import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Polyline } from 'google-maps-react';

// UTILS
import { COLORS } from '../../utils/colors';

// Context API
import AppContext from '../../reducer/context';

// Styled Elements
import MapWrapper from './elements/MapWrapper';

const LoadingContainer = () => <div>Fancy loading container!</div>;

export class MapContainer extends React.Component {
  state = {
    bounds: {},
    paths: []
  };

  componentDidUpdate() {
    const {
      state: { planner }
    } = this.context;
    const { paths } = this.state;

    if (planner !== false && paths.length === 0) {
      if (planner !== undefined && planner.length === 0) {
        this.noRouteForPlanner();
      } else {
        this.getCoords(planner);
      }
    }

    if (planner === false && paths.length > 0) {
      this.resetCoords();
    }
  }

  getCoords = data => {
    const { google } = this.props;

    const paths = [];

    data.leg.bigSteps.forEach(p => {
      p.points.forEach(point => {
        paths.push(point);
      });
    });

    const bounds = new google.maps.LatLngBounds();
    paths.forEach(c => bounds.extend(c));

    this.setState({
      paths,
      bounds
    });
  };

  noRouteForPlanner = () => {
    alert('No route for your choice, please choose another departure and destination');
  };

  resetCoords = () => {
    this.setState({
      paths: [],
      bounds: {}
    });
  };

  render() {
    const { google } = this.props;
    const { bounds, paths } = this.state;

    return (
      <MapWrapper>
        <Map
          google={google}
          zoom={14}
          mapTypeControl={false}
          zoomControl={false}
          scaleControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          initialCenter={{ lat: 38.7371727, lng: -9.133851 }}
          bounds={bounds}
        >
          <Polyline path={paths} strokeColor={COLORS.GREEN} strokeWeight={3} />
        </Map>
      </MapWrapper>
    );
  }
}

MapContainer.contextType = AppContext;

MapContainer.propTypes = {
  google: PropTypes.oneOfType([PropTypes.object])
};

MapContainer.defaultProps = {
  google: false
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqz4bTufuL-mI8fuc3zfier_PpbVTz9BI',
  LoadingContainer
})(MapContainer);
