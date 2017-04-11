import React from 'react';
import {Route, Redirect, IndexRedirect} from 'react-router';

import App from './components/App';
import Page from './containers/Page';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="signin"/>
    <Route path="signin"
           breadcrumbName="登陆"
           getComponent={(nextState, cb) => {
             require.ensure([], require => {
               cb(null, require('./containers/LoginPage').default)
             }, 'signin')
           }}
    />
    <Route path="signup"
           breadcrumbName="注册"
           getComponent={(nextState, cb) => {
             require.ensure([], require => {
               cb(null, require('./containers/RegisterPage').default)
             }, 'signup')
           }}
    />
    <Route path="forget"
           breadcrumbName="忘记密码"
           getComponent={(nextState, cb) => {
             require.ensure([], require => {
               cb(null, require('./containers/ForgetPage').default)
             }, 'forget')
           }}
    />
    <Route path="agreement"
           breadcrumbName="用户协议"
           getComponent={(nextState, cb) => {
             require.ensure([], require => {
               cb(null, require('./containers/AgreementPage').default)
             }, 'agreement')
           }}
    />
    <Route path="page" breadcrumbName="SSP" component={Page}>
      <IndexRedirect to="media"/>
      <Route path="media" breadcrumbName="媒体管理">
        <IndexRedirect to="overview"/>
        <Redirect from="overview" to="overview/1"/>
        <Route path="overview/:page"
               breadcrumbName="媒体列表"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/MediaViewPage').default)
                 }, 'mediaOverview')
               }}
        />
        <Route path="edit/:id"
               breadcrumbName="编辑媒体"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/MediaFormPage').default)
                 }, 'mediaEdit')
               }}
        />Î
        <Route path="new"
               breadcrumbName="新建媒体"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/MediaFormPage').default)
                 }, 'mediaNew')
               }}
        />Î
      </Route>
      <Route path="ad" breadcrumbName="广告位管理">
        <IndexRedirect to="overview"/>
        <Redirect from="overview" to="overview/1"/>
        <Route path="overview/:page"
               breadcrumbName="广告位列表"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/AdViewPage').default)
                 }, 'adOverview')
               }}
        />
        <Route path="edit/:id"
               breadcrumbName="编辑广告位"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/AdFormPage').default)
                 }, 'adEdit')
               }}
        />
        <Route path="new"
               breadcrumbName="新建广告位"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/AdFormPage').default)
                 }, 'adNew')
               }}
        />
      </Route>
      <Route path="shield" breadcrumbName="广告位管理">
        <IndexRedirect to="overview"/>
        <Redirect from="overview" to="overview/1"/>
        <Route path="overview/:page"
               breadcrumbName="屏蔽策略管理"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/ShieldViewPage').default)
                 }, 'shieldOverview')
               }}
        />
        <Route path="edit/:id"
               breadcrumbName="编辑屏蔽策略"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/ShieldFormPage').default)
                 }, 'shieldEdit')
               }}
        />
        <Route path="new"
               breadcrumbName="新建屏蔽策略"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/ShieldFormPage').default)
                 }, 'shieldNew')
               }}
        />
      </Route>
      <Route path="doc" breadcrumbName="技术对接">
        <IndexRedirect to="overview"/>
        <Route path="overview"
               breadcrumbName="SDK文档"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/DocViewPage').default)
                 }, 'docOverview')
               }}
        />
      </Route>
      <Route path="user" breadcrumbName="账号管理">
        <IndexRedirect to="overview"/>
        <Route path="overview"
               breadcrumbName="用户管理"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/UserViewPage').default)
                 }, 'userOverview')
               }}
        />
      </Route>
      <Route path="chart-app" breadcrumbName="数据分析">
        <IndexRedirect to="overview"/>
        <Route path="overview"
               breadcrumbName="媒体数据"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/ChartViewPage').default)
                 }, 'chartAppOverview')
               }}
        />
      </Route>
      <Route path="chart-pit" breadcrumbName="数据分析">
        <IndexRedirect to="overview"/>
        <Route path="overview"
               breadcrumbName="广告位数据"
               getComponent={(nextState, cb) => {
                 require.ensure([], require => {
                   cb(null, require('./containers/ChartViewPage').default)
                 }, 'chartPitOverview')
               }}
        />
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
