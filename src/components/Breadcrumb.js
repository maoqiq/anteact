import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import * as actions from '../actions/fuelSavingsActions';


import {Form, Input, Tooltip, Icon, Checkbox, Button, Tabs, Breadcrumb} from 'antd';

class AppBreadcrumb extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="overview doc-overview-page">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

AppBreadcrumb.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBreadcrumb);
