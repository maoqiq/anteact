import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';


import {Breadcrumb} from 'antd';


class AppBreadcrumb extends Component {
  constructor(props) {
    super(props)
    // this.itemRender = this.itemRender.bind(this)
  }

  itemRender(route, params, routes, paths) {
    console.log(route);
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  render() {
    return (
      <div className="overview breadcrumb">
        <Breadcrumb itemRender={this.itemRender}/>;
      </div>
    );
  }
}

export default AppBreadcrumb
