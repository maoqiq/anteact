import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';


import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
const FormItem = Form.Item;

import {signIn}  from '../actions/account'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  // 处理表单提交
  handleSubmit(e) {
    e.preventDefault()
    const formValues = this.props.form.getFieldsValue()
    this.signIn(formValues)
  }


  // 登陆
  signIn(params) {
    const _user = Object.assign({}, {loginType: 3}, params)
    return this.props.signIn(_user)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const login = this.props.login

    return (
      <div className="login account">
        <Form onSubmit={this.handleSubmit} className="account-form login-form">
          <h3 className="form-title">
            登陆
          </h3>
          <Spin spinning={login.isFetching}>
            <FormItem>
              {getFieldDecorator('mail', {
                rules: [{required: true, message: '请输入用户名'}],
                initialValue: 'liuhong@adbaitai.com'
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
                initialValue: 'Liuhong163'
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入密码"/>
              )}
            </FormItem>
            <FormItem>
              <Checkbox>记住账号</Checkbox>
              <a className="login-form-forgot">忘记密码</a>

            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="block">
                登陆
              </Button>
              <Link to="/signup">立即注册</Link>
            </FormItem>
          </Spin>

        </Form>
      </div>

    );
  }
}


LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
}

LoginPage.propTypes = {
  login: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const {login} = state;
  return {
    login,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn(params){
      dispatch(signIn(params));
    }
  }
}

LoginPage = Form.create()(LoginPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
