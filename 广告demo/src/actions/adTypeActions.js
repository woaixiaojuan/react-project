import axios from 'axios';

export function fetchAdType() {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_AD',
      payload: axios.get('/api/categories'),
    });
  }
}
