import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import {Form, Input, Button, Row, Col, Spin, Checkbox} from 'antd'
const FormItem = Form.Item

import {signUp, sendCode}  from '../actions/account'
import CountDown from '../components/account/CountDown'

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSendCode = this.handleSendCode.bind(this)
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.props.signUp(values)
    })

  }


  handleCancelSubmit(e) {
    e.preventDefault()
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
    }
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
    }
    const {getFieldDecorator} = this.props.form
    const {register} = this.props
    return (
      <div className="register account">
        <Form onSubmit={this.handleSubmit} className="register-form account-form" noValidate>
          <h3 className="form-title">
            注册
          </h3>
          <Spin spinning={register.isFetching}>
            <FormItem
              label="用户名"
              {...formItemLayout}
            >
              {getFieldDecorator('mail', {
                rules: [
                  {
                    required: true, message: '请输入邮箱作为用户名'
                  }, {
                    type: 'email', message: '请输入正确的邮箱格式'
                  }]
              })(
                <Input type="email" placeholder="请输入可用的邮箱作为用户名"/>
              )}
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
              label="公司名称"
              {...formItemLayout}
            >
              {getFieldDecorator('companyName', {
                rules: [{required: true, message: '请输入公司名称'}],
              })(
                <Input type="text" placeholder="请输入公司名称"/>
              )}
            </FormItem>

            <FormItem
              label="联系人姓名"
              {...formItemLayout}
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '请输入联系人姓名'}],
              })(
                <Input type="text" placeholder="请输入真实的联系人姓名"/>
              )}
            </FormItem>

            <FormItem
              label="联系电话"
              {...formItemLayout}
            >
              {getFieldDecorator('contactTel', {
                rules: [{required: true, message: '请输入联系电话'}],
              })(
                <Input type="tel" placeholder="请输入真实的联系电话"/>
              )}
            </FormItem>

            <FormItem
              {...tailFormItemLayout}
            >
              {getFieldDecorator('isAgree', {
                rules: [{
                  required: true, message: '请同意该协议'
                }],
              })(
                <Checkbox>我已阅读并同意<Link to="/agreement">《来推平台服务协议》</Link></Checkbox>
              )}
            </FormItem>

            <FormItem
              className="form-actions"
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit" className="login-form-button">
                立即注册
              </Button>
              <Button htmlType="button" className="login-form-button" onClick={this.handleCancelSubmit}>
                返回
              </Button>
            </FormItem>
          </Spin>
        </Form>
      </div>

    )
  }
}

RegisterPage.contextTypes = {
  router: PropTypes.object.isRequired,

}

RegisterPage.propTypes = {
  code: PropTypes.object.isRequired,
  register: PropTypes.object.isRequired,
  sendCode: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {code, register} = state
  return {
    code,
    register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendCode(mail) {
      dispatch(sendCode(mail))
    },
    signUp(params){
      dispatch(signUp(params))
    }
  }
}

RegisterPage = Form.create()(RegisterPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)
