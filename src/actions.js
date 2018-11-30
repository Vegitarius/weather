import { 
  TRANSLATE_LOCATION_PENDING,
  TRANSLATE_LOCATION_SUCCESS,
  TRANSLATE_LOCATION_FAILED,
} from './constants';

export const translateLocation = (lat, long) => (dispatch) => {
  dispatch({ type: TRANSLATE_LOCATION_PENDING });
  fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
  lat + 
  "," +
  long + 
  "&key=" + 
  process.env.REACT_APP_LOCATION_KEY)
  .then(response => response.json())
  .then(data => dispatch({ type: TRANSLATE_LOCATION_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: TRANSLATE_LOCATION_FAILED, payload: error}))
} 