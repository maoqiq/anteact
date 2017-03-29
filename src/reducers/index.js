import {combineReducers} from 'redux';
import {routerReducer}from 'react-router-redux';

import fuelSavings from './fuelSavingsReducer';
import {login, register, code} from './account';
import {mediaForm, mediaList} from './media';
import {adForm, adList, specList} from './ad';
import {shieldForm, shieldList, industryList} from './shield';
import {userInfo} from './user';

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

  routing: routerReducer
})


export default rootReducer;
