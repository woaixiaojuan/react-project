import { combineReducers } from 'redux';

import openBox from './openBoxReducer';
import rewardOk from './rewardOkReducer';

export default combineReducers({
  openBox,
  rewardOk,
});
