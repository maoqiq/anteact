import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import * as actions from '../actions/fuelSavingsActions';

import {Switch, Button} from 'antd';

class UserViewPage extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="overview user-overview-page">
        <div className="user-basic-info">
          <h1>基本信息</h1>
          <p>公司名称：杭州美哒网络科技有限公司</p>
          <p>联系人：石建</p>
          <p>联系电话：13073699786</p>
          <p>电子邮箱：shijianwu1986@163.com</p>
        </div>
        <div className="user-financial-info">
          <h1>财务信息</h1>
          <p>公司名称：杭州美哒网络科技有限公司</p>
          <p>联系人：石建</p>
          <p>联系电话：13073699786</p>
          <p>电子邮箱：shijianwu1986@163.com</p>
        </div>
        <Button type="primary" className="login-form-button">
          <Link to="/page/user/modify">修改</Link>
        </Button>
      </div>
    );
  }
}

UserViewPage.propTypes = {
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
)(UserViewPage);
