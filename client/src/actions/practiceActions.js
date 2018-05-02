import axios from 'axios';

import {
  GET_UPCOMING,
  UPCOMING_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_UPCOMING
} from './types';

// Get upcoming practices
export const getUpcomingPractices = () => dispatch => {
  dispatch(setUpcomingLoading());
  axios
    .get('/api/practices')
    .then(res =>
      dispatch({
        type: GET_UPCOMING,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_UPCOMING,
        payload: {}
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Create practice
export const createPractice = (profileData, history) => dispatch => {
  axios
    .post('/api/practices', profileData)
    .then(res => history.push('/intern/semesterplan'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Practice loading
export const setUpcomingLoading = () => {
  return {
    type: UPCOMING_LOADING
  };
};

// Clear current upcoming
export const clearCurrentUpcoming = () => {
  return {
    type: CLEAR_CURRENT_UPCOMING
  };
};
