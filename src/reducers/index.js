import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import account from './account';
import {mediaForm, mediaList} from './media';
import {adForm, adList} from './ad';

const rootReducer = combineReducers({
  fuelSavings,
  account,
  mediaForm,
  mediaList,

  adForm,
  adList,
  routing: routerReducer
})


export default rootReducer;
