import { 
  TRANSLATE_LOCATION_PENDING,
  TRANSLATE_LOCATION_SUCCESS,
  TRANSLATE_LOCATION_FAILED,

  GET_LATLONG_PENDING,

  GET_LATLONG_SUCCESS,
  GET_LATLONG_FAILED,

  WEATHER_FINDER_PENDING,
  WEATHER_FINDER_SUCCESS,
  WEATHER_FINDER_FAILED,
  corsProxy,
  CHANGE_ZIPCODE,
  FOCUS_CARD
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
    .then(data => dispatch({ type: TRANSLATE_LOCATION_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: TRANSLATE_LOCATION_FAILED, payload: error }))
}

export const handleWeather = (lat, long) => (dispatch) => {
  dispatch({ type: WEATHER_FINDER_PENDING });
  fetch(corsProxy + `https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHER_KEY}/${lat},${long}`)
    .then(response => response.json())
    .then(data => dispatch({ type: WEATHER_FINDER_SUCCESS, payload: data}))
    .then(error => dispatch({ type: WEATHER_FINDER_FAILED, payload: error}))
}

export const getLatLong = (zipcode) => (dispatch) => {
  dispatch({ type: GET_LATLONG_PENDING });
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${process.env.REACT_APP_LOCATION_KEY}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_LATLONG_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: GET_LATLONG_FAILED, payload: error }))
}

export const setZipcode = text => ({
  type: CHANGE_ZIPCODE,
  payload: text
})

export const handleDOW = (dow) => (dispatch) => {
  dispatch({
    type: FOCUS_CARD, 
    payload: dow
  })
}