import {combineReducers} from 'redux';

import counter from './count';
import formnames from './formnames';
import storeforms from './storeforms';

export default combineReducers({
  //count
  counter,
  formnames,
  storeforms
});
