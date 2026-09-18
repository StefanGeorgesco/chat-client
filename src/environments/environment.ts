import { key } from './secret';

export const environment = {
  wsUri: `ws://${window.location.hostname}:${window.location.port}/chat`,
  geoApiUrl: `http://${window.location.hostname}:${window.location.port}/geo`,
  googleMapsApiKey: key,
};
