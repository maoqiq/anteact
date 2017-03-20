import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import account from './account';
import mediaForm from './mediaForm';

const rootReducer = combineReducers({
  fuelSavings,
  account,
  mediaForm,
  routing: routerReducer
});

export default rootReducer;
