import { 
  TRANSLATE_LOCATION_PENDING,
  TRANSLATE_LOCATION_SUCCESS,
  TRANSLATE_LOCATION_FAILED,
} from './constants';


const initialStateLocation = {
  isPending: false,
  city: "NYC",
  state: 'NY'
}

export const translateLocation = (state=initialStateLocation, action={}) => {
  switch(action.type) {
    case TRANSLATE_LOCATION_PENDING:
      return Object.assign({}, state, { isPending: true })
    case TRANSLATE_LOCATION_SUCCESS:
      return Object.assign({}, state, { 
        city: action.payload.results[0].address_components[2].long_name,
        state: action.payload.results[0].address_components[4].short_name,
        isPending: false
        })
    case TRANSLATE_LOCATION_FAILED:
        return Object.assign({}, state, { error: action.payload, isPending: false})
    default:
    return state;
  }
}