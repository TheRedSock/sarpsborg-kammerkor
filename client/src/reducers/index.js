// Dependency imports
import { combineReducers } from 'redux';

// Reducer imports
import authReducer from './authReducer';
import errorReducer from './errorReducer';

// Export combined reducers
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
