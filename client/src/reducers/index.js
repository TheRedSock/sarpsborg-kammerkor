// Dependency imports
import { combineReducers } from 'redux';

// Reducer imports
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import practiceReducer from './practiceReducer';

// Export combined reducers
export default combineReducers({
  auth: authReducer,
  practice: practiceReducer,
  errors: errorReducer
});
