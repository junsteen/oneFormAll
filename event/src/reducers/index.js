import {combineReducers} from 'redux';

import counter from './count';
import formnames from './formnames';
import storeforms from './storeforms';
import getformdata from './getformdata';
import timer from './timer';

export default combineReducers({
  //count
  counter,
  formnames,
  storeforms,
  getformdata,
  timer
});
