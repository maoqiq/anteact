import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
const FormItem = Form.Item;

import {fetchUser} from '../actions/user'

class UserViewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowInput: false
    }
    this.toggleInputShow = this.toggleInputShow.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.props.fetchUserInfo()
  }

  // 切换信息的编辑与显示的状态
  toggleInputShow() {
    this.setState({isShowInput: !this.state.isShowInput})
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    const {userInfo} = this.props
    const {getFieldDecorator} = this.props.form;
    const isShowInput = this.state.isShowInput

    return (
      <div className="overview user-overview-page" style={{padding: '10px 20px'}}>
        <div className="basic-info">
          <div className="title">
            <span className="text">基本信息</span>
            <Button className="button" onClick={this.toggleInputShow}>修改</Button>
          </div>
          <Form onSubmit={this.handleSubmit} className="form" style={{width: '80%'}} noValidate>
            <FormItem
              {...formItemLayout}
              label="公司名称:"
            >
              {isShowInput ?
                (<span>
                    {getFieldDecorator('companyName', {
                      rules: [{
                        required: true, message: '请输入公司名称'
                      }],
                      initialValue: userInfo.companyName
                    })(
                      <Input type="text" placeholder="请输入公司名称"/>
                    )}
                  </span>)
                : <span>{userInfo.companyName}</span>
              }


            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人:"
            >
              {isShowInput ?
                (<span>
                    {getFieldDecorator('linkman', {
                      rules: [{
                        required: true, message: '请输入联系人'
                      }],
                      initialValue: userInfo.linkman
                    })(
                      <Input type="text" placeholder="请输入联系人"/>
                    )}
                  </span>)
                : <span>{userInfo.linkman}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话:"
            >
              {isShowInput ?
                (<span>
                    {getFieldDecorator('linkPhone', {
                      rules: [{
                        required: true, message: '请输入联系电话'
                      }],
                      initialValue: userInfo.linkPhone
                    })(
                      <Input type="tel" placeholder="请输入联系电话"/>
                    )}
                  </span>)
                : <span>{userInfo.linkPhone}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电子邮箱:"
            >
              {isShowInput ?
                (<span>
                    {getFieldDecorator('email', {
                      rules: [{
                        required: true, message: '请输入邮箱'
                      }],
                      initialValue: userInfo.email
                    })(
                      <Input type="email" placeholder="请输入邮箱"/>
                    )}
                  </span>)
                : <span>{userInfo.email}</span>
              }
            </FormItem>
            {isShowInput &&
            <FormItem
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">保存</Button>
              <Button type="primary" htmlType="button">取消</Button>
            </FormItem>
            }

          </Form>
        </div>

        <div className="financial-info">
          <div className="title">
            <h4 className="">财务信息</h4>
          </div>
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
  userInfo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {userInfo} = state;
  return {
    userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserInfo() {
      dispatch(fetchUser({}));
    },
  }
}

UserViewPage = Form.create()(UserViewPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
