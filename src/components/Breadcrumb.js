import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';


import {Breadcrumb} from 'antd';

import routes from '../routes';


class AppBreadcrumb extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="overview breadcrumb">
        <Breadcrumb />;
      </div>
    );
  }
}

export default AppBreadcrumb
