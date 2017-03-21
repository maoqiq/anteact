import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import account from './account';
import {mediaForm, mediaList} from './media';

const rootReducer = combineReducers({
  fuelSavings,
  account,
  mediaForm,
  mediaList,
  routing: routerReducer
})
  

export default rootReducer;
