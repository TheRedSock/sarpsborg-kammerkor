// Import action types
import { SET_CURRENT_USER } from '../actions/types';

import isEmpty from '../validation/is-empty';

// Initial auth state
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
};

// Auth actions
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      let isAdmin = false;
      if (action.payload.permissions) {
        isAdmin = action.payload.permissions.indexOf('admin') !== -1;
      }
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: isAdmin,
        user: action.payload
      };
    default:
      return state;
  }
}
