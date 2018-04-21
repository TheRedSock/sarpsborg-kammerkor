// Dependency imports
import { combineReducers } from 'redux';

// Reducer imports
import authReducer from './authReducer';

// Export combined reducers
export default combineReducers({
  auth: authReducer
});
