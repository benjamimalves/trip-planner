import React from 'react';
import PropTypes from 'prop-types';
import {
  GoogleApiWrapper,
  Map,
  InfoWindow,
  Marker,
  Polyline
} from 'google-maps-react';

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
    paths: [],
    showingInfoWindow: false,
    activeMarker: {},
    activeMarkerInfo: {}
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

  onMarkerClick = (props, marker, info) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      activeMarkerInfo: {
        ...info,
        distance: props.planner.leg.distance,
        duration: props.planner.leg.duration
      }
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: {},
      activeMarkerInfo: {}
    });
  };

  noRouteForPlanner = () => {
    // TODO: Add dispatch for planner error
  };

  renderMarker = (planner, paths, info, type) => {
    const { google } = this.props;

    if (planner && paths.length > 0) {
      const lat =
        type === 'destination' ? paths[paths.length - 1].lat : paths[0].lat;
      const lng =
        type === 'destination' ? paths[paths.length - 1].lng : paths[0].lng;
      return (
        <Marker
          onClick={(props, marker) => this.onMarkerClick(props, marker, info)}
          icon={{
            url:
              type === 'destination' ? 'marker-destination.svg' : 'marker.svg',
            anchor: new google.maps.Point(13, 13)
          }}
          planner={planner}
          position={{
            lat,
            lng
          }}
        />
      );
    }

    return null;
  };

  render() {
    const { google } = this.props;
    const {
      bounds,
      paths,
      activeMarker,
      showingInfoWindow,
      activeMarkerInfo
    } = this.state;
    const {
      state: { planner, destination, departure }
    } = this.context;

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
          {this.renderMarker(planner, paths, departure, 'departure')}
          {this.renderMarker(planner, paths, destination, 'destination')}
          {planner && (
            <InfoWindow
              onClose={this.onInfoWindowClose}
              marker={activeMarker}
              visible={showingInfoWindow}
            >
              <div>
                <h2>
                  {activeMarkerInfo.header}
                  <p>
                    <small>{activeMarkerInfo.address}</small>
                  </p>
                </h2>
                <ul>
                  <li>
                    <b>Distance: </b>
                    {activeMarkerInfo.distance}
                  </li>
                  <li>
                    <b>Duration: </b>
                    {activeMarkerInfo.duration}
                  </li>
                </ul>
              </div>
            </InfoWindow>
          )}
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
