// eslint-disable-next-line import/prefer-default-export
export const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
export const CARRIS_API = `${CORS_ANYWHERE}https://carris.tecmic.com/api/v2.6/`;

export const ENDPOINTS = {
  GEOCODING: {
    SUGGEST: `${CARRIS_API}Geocoding/suggest/`,
    FROMID: `${CARRIS_API}Geocoding/fromId/`,
  },
  PLANNER: `${CARRIS_API}Planner/startlat/:startlat/startlon/:startlon/endLat/:endLat/endLon/:endLon/start/:datetime/language/en`
};
