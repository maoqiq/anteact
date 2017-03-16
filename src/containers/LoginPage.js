import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';


import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.account = {
      username: 'nnecec',
      password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.attributes)
  }

  handleInputChange(e) {
    console.log(e.target.value)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{width: 200}}>
        <FormItem>
          {getFieldDecorator('nickname', {
            rules: [{required: true, message: 'Please input your nickname!'}],
          })(
            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
          )}
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem>
          <Checkbox>记住账号</Checkbox>
          <a className="login-form-forgot">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
          Or <a>立即注册</a>
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
)(Form.create()(LoginPage));
