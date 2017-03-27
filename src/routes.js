import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import App from './components/App';
import Page from './containers/Page';

import NotFoundPage from './components/NotFoundPage';

import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

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
    <IndexRedirect to="signin"/>
    <Route path="signin" breadcrumbName="登陆" component={LoginPage}/>
    <Route path="signup" breadcrumbName="注册" component={RegisterPage}/>
    <Route path="page" breadcrumbName="SSP" component={Page}>
      <IndexRedirect to="media"/>
      <Route path="media" breadcrumbName="媒体管理">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="媒体列表" component={MediaViewPage}/>
        <Route path="new" breadcrumbName="新建媒体" component={MediaFormPage}/>
      </Route>
      <Route path="ad" breadcrumbName="广告位管理">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="广告位列表" component={AdViewPage}/>
        <Route path="new" breadcrumbName="新建广告位" component={AdFormPage}/>
      </Route>
      <Route path="shield" breadcrumbName="广告位管理">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="屏蔽策略管理" component={ShieldViewPage}/>
        <Route path="new" breadcrumbName="新建屏蔽策略" component={ShieldFormPage}/>
      </Route>
      <Route path="doc" breadcrumbName="技术对接">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="SDK文档" component={DocViewPage}/>
        <Route path="release" breadcrumbName="文档版本" component={DocReleasePage}/>
      </Route>
      <Route path="user" breadcrumbName="账号管理">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="用户管理" component={UserViewPage}/>
        <Route path="modify" breadcrumbName="媒体列表" component={UserFormPage}/>
      </Route>
      <Route path="chart" breadcrumbName="结算数据">
        <IndexRedirect to="overview"/>
        <Route path="overview" breadcrumbName="数据分析" component={ChartViewPage}/>
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
