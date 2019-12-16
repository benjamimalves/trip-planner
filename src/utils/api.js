// eslint-disable-next-line import/prefer-default-export
export const CARRIS_API = `/api?url=/v2.6/`;

export const ENDPOINTS = {
  GEOCODING: {
    SUGGEST: `${CARRIS_API}Geocoding/suggest/`,
    FROMID: `${CARRIS_API}Geocoding/fromId/`,
    REVERSE: `${CARRIS_API}Geocoding/reverse/lat/:lat/lng/:lng`
  },
  PLANNER: `${CARRIS_API}Planner/startlat/:startlat/startlon/:startlon/endLat/:endLat/endLon/:endLon/start/:datetime/language/en`
};
