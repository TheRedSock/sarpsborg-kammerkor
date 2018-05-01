import {
  GET_UPCOMING,
  UPCOMING_LOADING,
  CLEAR_CURRENT_UPCOMING
} from '../actions/types';

const initialState = {
  upcoming: null,
  practices: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPCOMING_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_UPCOMING:
      return {
        ...state,
        upcoming: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_UPCOMING:
      return {
        ...state,
        upcoming: null
      };
    default:
      return state;
  }
}
