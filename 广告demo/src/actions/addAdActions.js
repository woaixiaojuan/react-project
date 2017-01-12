import axios from 'axios';

export function fetchAd() {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_AD',
      payload: axios.get('/api/categories'),
    });
  }
}
