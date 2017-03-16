import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';


import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

class LoginPage extends React.Component {

  render() {
    return (
      <Form className="login-form">
        <FormItem>
          <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
        </FormItem>
        <FormItem>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <Link to="/page">登陆</Link>

          </Button>
          Or <a>register now!</a>
        </FormItem>
      </Form>
    );
  }
}

LoginPage.propTypes = {
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
)(LoginPage);
