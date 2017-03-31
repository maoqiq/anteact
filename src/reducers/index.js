import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import {loadingBarReducer} from 'react-redux-loading-bar'

import fuelSavings from './fuelSavingsReducer';
import {login, register, code} from './account';
import {mediaForm, mediaList} from './media';
import {adForm, adList, specList} from './ad';
import {shieldForm, shieldList, industryList} from './shield';
import {userInfo, financeInfo} from './user';
import {chart} from './chart';

const rootReducer = combineReducers({
  fuelSavings,

  login,
  register,
  code,

  mediaForm,
  mediaList,

  adForm,
  adList,
  specList,

  shieldForm,
  shieldList,
  industryList,

  userInfo,
  financeInfo,

  chart,

  routing: routerReducer,
  loadingBar: loadingBarReducer
})


export default rootReducer;
