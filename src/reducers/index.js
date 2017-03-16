import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import login from './account';

const rootReducer = combineReducers({
  fuelSavings,
  login,
  routing: routerReducer
});

export default rootReducer;
