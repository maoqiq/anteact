import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import account from './account';

const rootReducer = combineReducers({
  fuelSavings,
  account,
  routing: routerReducer
});

export default rootReducer;
