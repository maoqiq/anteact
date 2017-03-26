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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.props.form.getFieldsValue()
    console.log(username)


  }

  render() {
    // form 布局
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem
            label="用户名"
            {...formItemLayout}
          >
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入用户名'}],
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
            )}
          </FormItem>
          <FormItem
            label="密码"
            {...formItemLayout}
          >
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入密码"/>
            )}
          </FormItem>
          <FormItem
            {...tailFormItemLayout}
          >
            <Checkbox>记住账号</Checkbox>
            <a className="login-form-forgot">忘记密码</a>

          </FormItem>
          <FormItem
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>
            <a>立即注册</a>
          </FormItem>
        </Form>
      </div>

    );
  }
}

LoginPage = Form.create()(LoginPage)


export default LoginPage;
