import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Polyline } from 'google-maps-react';

// Context API
import MainContext from '../Main/context';

// Styled Elements
import MapWrapper from './elements/MapWrapper';

const LoadingContainer = () => <div>Fancy loading container!</div>;

export class MapContainer extends React.Component {
  componentDidUpdate() {
    console.log('this.context :: ', this.context);
    /* ... */
  }
  // componentDidUpdate(prevProps) {
  //   const { info } = this.props;
  //   console.log('componentDidUpdate :: prevProps ', prevProps);

  //   console.log(info.planner);
  //   console.log(Object.keys(info.destination).length);

  //   if (
  //     !info.planner &&
  //     Object.keys(info.departure).length !== 0 &&
  //     Object.keys(info.destination).length !== 0
  //   ) {
  //     console.log('RENDER');
  //   }
  // }

  getCoords = () => {
    // const { google } = this.props;

    const coords = [];
    // const bounds = new google.maps.LatLngBounds();
    // coords.forEach(c => bounds.extend(c));

    return coords;
  };

  render() {
    const { google, info, dispatch } = this.props;

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
          initialCenter={{ lat: 38.73112599999999, lng: -9.1344806 }}
          // bounds={bounds}
        >
          {/* <Polyline
            path={this.getCoords}
            strokeColor="#ff0000"
            strokeOpacity={0.8}
            strokeWeight={3}
          /> */}
        </Map>
      </MapWrapper>
    );
  }
}

MapContainer.contextType = MainContext;

MapContainer.propTypes = {
  google: PropTypes.oneOfType([PropTypes.object]),
  info: PropTypes.oneOfType([PropTypes.object])
};

MapContainer.defaultProps = {
  google: false,
  info: {}
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqz4bTufuL-mI8fuc3zfier_PpbVTz9BI',
  LoadingContainer
})(MapContainer);
