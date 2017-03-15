import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

import MediaViewPage from './containers/MediaViewPage';
import MediaFormPage from './containers/MediaFormPage';

import AdViewPage from './containers/AdViewPage';
import AdFormPage from './containers/AdFormPage';

import ShieldViewPage from './containers/ShieldViewPage';
import ShieldFormPage from './containers/ShieldFormPage';

import DocViewPage from './containers/DocViewPage';

import AccountViewPage from './containers/AccountViewPage';

import DataViewPage from './containers/DataViewPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="media">
      <Route path="overview" component={MediaViewPage}/>
      <Route path="new" component={MediaFormPage}/>
    </Route>
    <Route path="ad">
      <Route path="overview" component={AdViewPage}/>
      <Route path="new" component={AdFormPage}/>
    </Route>
    <Route path="shield">
      <Route path="overview" component={ShieldViewPage}/>
      <Route path="new" component={ShieldFormPage}/>
    </Route>
    <Route path="doc">
      <Route path="overview" component={DocViewPage}/>
    </Route>
    <Route path="account">
      <Route path="overview" component={AccountViewPage}/>
    </Route>
    <Route path="data">
      <Route path="overview" component={DataViewPage}/>
    </Route>

    <Route path="*" component={NotFoundPage}/>
  </Route>
);
