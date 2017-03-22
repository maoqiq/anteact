import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import account from './account';
import {mediaForm, mediaList} from './media';
import {adForm, adList} from './ad';
import {shieldForm, shieldList} from './shield';

const rootReducer = combineReducers({
  fuelSavings,
  account,
  mediaForm,
  mediaList,

  adForm,
  adList,

  shieldForm,
  shieldList,
  routing: routerReducer
})


export default rootReducer;
