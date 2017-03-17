import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import Page from './containers/Page';
import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

import LoginPage from './containers/LoginPage';

import MediaViewPage from './containers/MediaViewPage';
import MediaFormPage from './containers/MediaFormPage';

import AdViewPage from './containers/AdViewPage';
import AdFormPage from './containers/AdFormPage';

import ShieldViewPage from './containers/ShieldViewPage';
import ShieldFormPage from './containers/ShieldFormPage';

import DocViewPage from './containers/DocViewPage';
import DocReleasePage from './containers/DocReleasePage';

import UserViewPage from './containers/UserViewPage';
import UserFormPage from './containers/UserFormPage';

import ChartViewPage from './containers/ChartViewPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage}/>
    <Route path="page" component={Page}>
      <IndexRoute component={HomePage}/>
      <Route path="fuel-savings" breadcrumbName="" component={FuelSavingsPage}/>
      <Route path="about" component={AboutPage}/>

      <Route path="media" breadcrumbName="媒体">
        <Route path="overview" breadcrumbName="媒体列表" component={MediaViewPage}/>
        <Route path="new" breadcrumbName="新建媒体" component={MediaFormPage}/>
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
        <Route path="release" component={DocReleasePage}/>
      </Route>
      <Route path="user">
        <Route path="overview" component={UserViewPage}/>
        <Route path="modify" component={UserFormPage}/>
      </Route>
      <Route path="chart">
        <Route path="overview" component={ChartViewPage}/>
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
