import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Polyline } from 'google-maps-react';

// UTILS
import { COLORS } from '../../utils/colors';
import { GOOGLE_MAPS_KEY } from '../../utils/config';

// Components
import Loading from '../../components/Loading';

// Context API
import AppContext from '../../reducer/context';

// Styled Elements
import MapWrapper from './elements/MapWrapper';

const LoadingContainer = () => <Loading />;

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

    if (
      planner !== false &&
      Object.keys(planner).length !== 0 &&
      paths.length === 0
    ) {
      this.getCoords(planner);
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

  getStyle = () => {
    return [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f5f5'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffffff'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dadada'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e5e5e5'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#eeeeee'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#c9c9c9'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      }
    ];
  };

  noRouteForPlanner = () => {
    // TODO: Add dispatch for planner error
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
          styles={this.getStyle()}
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
  apiKey: GOOGLE_MAPS_KEY,
  LoadingContainer
})(MapContainer);
