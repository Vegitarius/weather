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

  LOCATE_USER_PENDING,
  LOCATE_USER_SUCCESS,
  LOCATE_USER_FAILED,

  CHANGE_ZIPCODE,
  FOCUS_CARD
} from './constants';

const initialStateWeather = {
  weather: null,
  currentTemp: null,
  currentIcon: null,
  todayHigh: null,
  todayLow: null,
  weatherPending: false
}

export const handleWeather = (state=initialStateWeather, action={}) => {
  switch(action.type) {
    case WEATHER_FINDER_PENDING:
      return Object.assign({}, state, { weatherPending: true })
    case WEATHER_FINDER_SUCCESS:
      return Object.assign({}, state, { 
        weather: action.payload, 
        currentTemp: action.payload.currently.temperature.toFixed(0),
        currentIcon: action.payload.currently.icon,
        currentSummary: action.payload.currently.summary,
        currentFeelsLike: action.payload.currently.apparentTemperature.toFixed(0),
        todayHigh: action.payload.daily.data[0].temperatureHigh.toFixed(0),
        todayLow: action.payload.daily.data[0].temperatureLow.toFixed(0),
        weatherPending: false 
      })
    case WEATHER_FINDER_FAILED:
      return Object.assign({}, state, { error: action.payload, weatherPending: false })
    default:
      return state;
  }
}

const initialStateLocation = {
  geoPending: false,
  location: "Manhattan, NY",
  country: 'none',
  locArray: null,
  weather : { latitude: 47}
}

export const translateLocation = (state=initialStateLocation, action={}) => {
  switch(action.type) {
    case TRANSLATE_LOCATION_PENDING:
      return Object.assign({}, state, { geoPending: true })
    case TRANSLATE_LOCATION_SUCCESS:
      let results, location, country;
      results = action.payload.results;
      for (let i = 0; i < results.length; i++) {
        if (results[i].types[0] === 'country') {
          country = results[i].address_components[0].short_name
        }
        if (country === 'US') {
            for (let i = 0; i < results.length; i++) {
              if (results[i].types[0] === 'postal_code') {
                let x = results[i].formatted_address;
                x = x.substring(0, x.length-11)
                location = x
              }
            }
          } else if (country !== 'US') {
            for (let i = 0; i < results.length; i++) {
              if (results[i].types[0] === 'administrative_area_level_1') {
                location = results[i].formatted_address
              }
            }
          }
        }
      return Object.assign({}, state, { 
        location: location,
        country: country,
        locArray: results,
        geoPending: false
        })
    case TRANSLATE_LOCATION_FAILED:
        return Object.assign({}, state, { error: action.payload, geoPending: false})
    default:
      return state;
  }
}

const initialStateLatLong = {
  latLongPending: false,
  latitude: '',
  longitude: ''
}

export const getLatLong = (state=initialStateLatLong, action={}) => {
  switch(action.type) {
    case GET_LATLONG_PENDING:
      return Object.assign({}, state, { latLongPending: true })
    case GET_LATLONG_SUCCESS:
      return Object.assign({}, state, {
        latitude: action.payload.results[0].geometry.location.lat,
        longitude: action.payload.results[0].geometry.location.lng,
        latLongPending: false
      })
    case GET_LATLONG_FAILED:
      return Object.assign({}, state, { error: action.payload, latLongPending: false })
    default:
      return state;
  }
}

const initialLocation = {
  locateUserPending: false,
  userLocated: false,
  latitude: '',
  longitude: ''
}

export const locateUser = (state=initialLocation, action={}) => {
  switch(action.type) {
    case LOCATE_USER_PENDING:
      return Object.assign({}, state, { locateUserPending: true });
    case LOCATE_USER_SUCCESS:
      return Object.assign({}, state, {
        latitude: String(action.payload.coords.latitude),
        longitude: String(action.payload.coords.longitude),
        locateUserPending: false,
        userLocated: true
      })
    case LOCATE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, locateUserPending: false})
    default:
      return state;
  }
}

const initailStateZip = {
  zipcode: 10276,
  date: new Date(),
  zcTakeover: false
}

export const setZipcode = (state=initailStateZip, action={}) => {
  switch(action.type) {
    case CHANGE_ZIPCODE:
      return Object.assign({}, state, { zipcode: action.payload, zcTakeover: true });
    default: 
      return state;
  }
}

export const handleDOWFocus = (state={ focusedCard: null}, action={}) => {
  switch(action.type) {
    case FOCUS_CARD:
      return (state.focusedCard
                ? Object.assign({}, state, { focusedCard: null }) 
                : Object.assign({}, state, { focusedCard: action.payload }));
    default:
      return state;
  }
}