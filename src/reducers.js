import { 
  TRANSLATE_LOCATION_PENDING,
  TRANSLATE_LOCATION_SUCCESS,
  TRANSLATE_LOCATION_FAILED,
  WEATHER_FINDER_PENDING,
  WEATHER_FINDER_SUCCESS,
  WEATHER_FINDER_FAILED
} from './constants';


const initialStateLocation = {
  geoPending: false,
  city: "Manhattan",
  state: 'NY'
}

export const translateLocation = (state=initialStateLocation, action={}) => {
  switch(action.type) {
    case TRANSLATE_LOCATION_PENDING:
      return Object.assign({}, state, { geoPending: true })
    case TRANSLATE_LOCATION_SUCCESS:
      return Object.assign({}, state, { 
        city: action.payload.results[0].address_components[2].long_name,
        state: action.payload.results[0].address_components[4].short_name,
        geoPending: false
        })
    case TRANSLATE_LOCATION_FAILED:
        return Object.assign({}, state, { error: action.payload,geoPending: false})
    default:
    return state;
  }
}

const initialStateWeather = {
  weather: {},
  weatherPending: false
}

export const handleWeather = (state=initialStateWeather, action={}) => {
  switch(action.type) {
    case WEATHER_FINDER_PENDING:
      return Object.assign({}, state, { weatherPending: true })
    case WEATHER_FINDER_SUCCESS:
      return Object.assign({}, state, { weather: action.payload, weatherPending: false })
    case WEATHER_FINDER_FAILED:
      return Object.assign({}, state, { error: action.payload, weatherPending: false })
    default:
      return state;
  }
}