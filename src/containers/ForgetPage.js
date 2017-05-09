import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';


import {Form, Input, Button, Row, Col, Spin} from 'antd';
const FormItem = Form.Item;

import {findPassword, sendCode}  from '../actions/account'
import CountDown from '../components/account/CountDown'

class ForgetPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSendCode = this.handleSendCode.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values)
      this.props.findPassword(values)
    })

  }


  handleCancelSubmit(e) {
    e.preventDefault();
    this.context.router.push('/signin')
  }

  handleSendCode() {
    const _mail = this.props.form.getFieldValue('mail')
    this.props.sendCode({mail: _mail})
  }

  render() {
    // form 布局
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
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
          offset: 6,
        },
      },
    };
    const {getFieldDecorator} = this.props.form;
    const {forget} = this.props
    return (
      <div className="forget account">
        <Form onSubmit={this.handleSubmit} className="forget-form account-form" noValidate>
          <h3 className="form-title">
            找回密码
          </h3>
          <Spin spinning={forget.isFetching}>
            <FormItem
              label="用户名"
              {...formItemLayout}
            >
              {getFieldDecorator('mail', {
                rules: [
                  {
                    required: true, message: '请输入您的邮箱'
                  }, {
                    type: 'email', message: '请输入正确的邮箱格式'
                  }]
              })(
                <Input type="email" placeholder="请输入您的邮箱"/>
              )}
            </FormItem>

            <FormItem
              label="验证码"
              {...formItemLayout}
            >
              <Row gutter={8}>
                <Col span={14}>
                  {getFieldDecorator('code', {
                    rules: [{required: true, message: '请输入你接受到的验证码'}],
                  })(
                    <Input size="large" type="text" placeholder="请输入验证码"/>
                  )}
                </Col>
                <Col span={10}>
                  <CountDown sendCode={this.handleSendCode} countTime={90}/>
                </Col>
              </Row>
            </FormItem>

            <FormItem
              label="密码"
              {...formItemLayout}
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码'
                }, {
                  min: 8, message: '请输入不小于8位的密码'
                }],
              })(
                <Input type="password" placeholder="请输入密码"/>
              )}
            </FormItem>


            <FormItem
              className="form-actions"
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit" className="login-form-button">
                立即重设
              </Button>
              <Button htmlType="button" className="login-form-button" onClick={this.handleCancelSubmit}>
                返回
              </Button>
            </FormItem>
          </Spin>
        </Form>
      </div>

    );
  }
}

ForgetPage.contextTypes = {
  router: PropTypes.object.isRequired
}

ForgetPage.propTypes = {
  code: PropTypes.object.isRequired,
  forget: PropTypes.object.isRequired,
  sendCode: PropTypes.func.isRequired,
  findPassword: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {code, forget} = state;
  return {
    code,
    forget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendCode(mail) {
      dispatch(sendCode(mail));
    },
    findPassword(params){
      dispatch(findPassword(params));
    }
  }
}

ForgetPage = Form.create()(ForgetPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPage)
