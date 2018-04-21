// Import action types
import { GET_ERRORS } from '../actions/types';

// Initial error state
const initialState = {};

// Error actions
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
