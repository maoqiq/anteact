import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import {Form, Input, Radio, Button, Upload, Icon, message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;

import {fetchUser} from '../actions/user'

class UserViewPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowBasicInput: false,
      isShowFinancialInput: false,
      whichRoleType: 0
    }

    this.toggleInputShow = this.toggleInputShow.bind(this)
    this.handleRoleTypeChange = this.handleRoleTypeChange.bind(this)

    this.handleBasicSubmit = this.handleBasicSubmit.bind(this)
    this.handleFinancialSubmit = this.handleFinancialSubmit.bind(this)
  }

  // 组件加载完成后执行
  componentDidMount() {
    this.fetchUserInfo();
  }

  // 拉去用户数据
  fetchUserInfo() {
    this.props.fetchUserInfo()
  }

  // 切换 编辑input 与 显示 的状态
  toggleInputShow(type, e) {
    console.log(arguments)
    switch (type) {
      case 'basic':
        this.setState({isShowBasicInput: !this.state.isShowBasicInput})
        break
      case 'financial':
        this.setState({isShowFinancialInput: !this.state.isShowFinancialInput})
        break
      default:
        break
    }
  }

  // 处理 basic info 表单提交
  handleBasicSubmit(e) {
    e.preventDefault();
    console.log(e.target.name)
  }

  // 处理 financial info 表单提交
  handleFinancialSubmit(e) {
    e.preventDefault();
    console.log(e.target.name)
    const formValue = this.props.form.getFieldsValue()
    console.log(formValue)
  }

  // 处理财务对象的改变
  handleRoleTypeChange(e) {
    this.setState({whichRoleType: e.target.value})
  }

  // 渲染
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 3},
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
          offset: 3,
        },
      },
    };

    // 营业执照
    const businessLicenseDrops = {
      name: 'file',
      multiple: true,
      showUploadList: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    // 设置变量
    const {userInfo} = this.props
    const {getFieldDecorator} = this.props.form
    const isShowBasicInput = this.state.isShowBasicInput
    const isShowFinancialInput = this.state.isShowFinancialInput
    const whichRoleType = this.state.whichRoleType

    return (
      <div className="overview user-overview">
        <div className="info basic-info">
          <div className="title">
            <span className="text">基本信息</span>
            <Button className="button" name="basic" size="small"
                    onClick={this.toggleInputShow.bind(this, 'basic')}>修改</Button>
          </div>
          <Form name="basicInfo" onSubmit={this.handleBasicSubmit} className="form" style={{width: '80%'}} noValidate>
            <FormItem
              {...formItemLayout}
              label="公司名称:"
            >
              {isShowBasicInput ?
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
              {isShowBasicInput ?
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
              {isShowBasicInput ?
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
              {isShowBasicInput ?
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
            {isShowBasicInput &&
            <FormItem
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">保存</Button>
              <Button type="primary" htmlType="button">取消</Button>
            </FormItem>
            }

          </Form>
        </div>
        <div className="info company-info">
          <div className="title">
            <span className="text">财务信息</span>
            <Button className="button"
                    size="small"
                    onClick={this.toggleInputShow.bind(this, 'financial')}
            >
              修改
            </Button>
          </div>
          <Form name="financialInfo"
                onSubmit={this.handleFinancialSubmit}
                className="form"
                style={{width: '80%'}}
                noValidate
          >
            <FormItem
              {...formItemLayout}
              label="财务对象:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('roleType', {
                      rules: [{
                        required: true, message: '请选择财务对象'
                      }],
                      initialValue: userInfo.roleType || 0
                    })(
                      <RadioGroup
                        onChange={this.handleRoleTypeChange}
                      >
                        <Radio value={0}>公司</Radio>
                        <Radio value={1}>个人</Radio>
                      </RadioGroup>
                    )}
                  </span>)
                : <span>{userInfo.roleType}</span>
              }
            </FormItem>
            {
              whichRoleType === 0 &&
              <FormItem
                {...formItemLayout}
                label="收款公司名称:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('financeCompanyName', {
                      rules: [{
                        required: true, message: '请输入收款公司名称'
                      }],
                      initialValue: userInfo.financeCompanyName
                    })(
                      <Input type="text" placeholder="请输入收款公司名称"/>
                    )}
                  </span>)
                  : <span>{userInfo.financeCompanyName}</span>
                }

              </FormItem>
            }

            {
              whichRoleType === 0 &&
              <FormItem
                {...formItemLayout}
                label="营业执照号:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('businessLicenseId', {
                      rules: [{
                        required: true, message: '请输入营业执照号'
                      }],
                      initialValue: userInfo.businessLicenseId
                    })(
                      <Input type="text" placeholder="请输入营业执照号"/>
                    )}
                  </span>)
                  : <span>{userInfo.businessLicenseId}</span>
                }
              </FormItem>
            }
            {
              whichRoleType === 0 &&
              <FormItem
                {...formItemLayout}
                label="营业执照:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('businessLicenseUrl', {
                      rules: [{
                        required: true, message: '请输入营业执照'
                      }],
                      initialValue: userInfo.businessLicenseUrl
                    })(
                      <div style={{marginTop: 16, height: 200}}>
                        <Dragger {...businessLicenseDrops} style={{padding: '20px'}}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox"/>
                          </p>
                          <p className="ant-upload-text">点击或拖拽图片到此处上传营业执照</p>
                          <p className="ant-upload-hint">格式限制JPG/JPEG/PNG</p>
                        </Dragger>
                      </div>
                    )}
                  </span>)
                  : <span>{userInfo.businessLicenseUrl}</span>
                }
              </FormItem>
            }

            {
              whichRoleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="个人姓名:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('personalName', {
                      rules: [{
                        required: true, message: '请输入个人姓名'
                      }],
                      initialValue: userInfo.personalName
                    })(
                      <Input type="tel" placeholder="请输入个人姓名"/>
                    )}
                  </span>)
                  : <span>{userInfo.personalName}</span>
                }
              </FormItem>
            }
            {
              whichRoleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="身份证号:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('idCard', {
                      rules: [{
                        required: true, message: '请输入身份证号'
                      }],
                      initialValue: userInfo.idCard
                    })(
                      <Input type="tel" placeholder="请输入身份证号"/>
                    )}
                  </span>)
                  : <span>{userInfo.idCard}</span>
                }
              </FormItem>
            }
            {
              whichRoleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="身份证正面照:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('idCardFrontUrl', {
                      rules: [{
                        required: true, message: '请输入身份证正面照'
                      }],
                      initialValue: userInfo.idCardFrontUrl
                    })(
                      <Input type="tel" placeholder="请输入身份证正面照"/>
                    )}
                  </span>)
                  : <span>{userInfo.idCardFrontUrl}</span>
                }
              </FormItem>
            } {
            whichRoleType === 1 &&
            <FormItem
              {...formItemLayout}
              label="身份证背面照:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('idCardBackUrl', {
                      rules: [{
                        required: true, message: '请输入身份证背面照'
                      }],
                      initialValue: userInfo.idCardBackUrl
                    })(
                      <Input type="tel" placeholder="请输入身份证背面照"/>
                    )}
                  </span>)
                : <span>{userInfo.idCardBackUrl}</span>
              }
            </FormItem>
          }

            <FormItem
              {...formItemLayout}
              label="开户行:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('bankName', {
                      rules: [{
                        required: true, message: '请输入开户行'
                      }],
                      initialValue: userInfo.bankName
                    })(
                      <Input type="text" placeholder="请输入开户行"/>
                    )}
                  </span>)
                : <span>{userInfo.bankName}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="支行名称:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('branchName', {
                      rules: [{
                        required: true, message: '请输入支行名称'
                      }],
                      initialValue: userInfo.branchName
                    })(
                      <Input type="text" placeholder="请输入支行名称"/>
                    )}
                  </span>)
                : <span>{userInfo.branchName}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="开户行地址:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('address', {
                      rules: [{
                        required: true, message: '请输入开户行地址'
                      }],
                      initialValue: userInfo.address
                    })(
                      <Input type="text" placeholder="请输入开户行地址"/>
                    )}
                  </span>)
                : <span>{userInfo.address}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="银行账号:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('cardNumber', {
                      rules: [{
                        required: true, message: '请输入银行账号'
                      }],
                      initialValue: userInfo.cardNumber
                    })(
                      <Input type="text" placeholder="请输入银行账号"/>
                    )}
                  </span>)
                : <span>{userInfo.cardNumber}</span>
              }
            </FormItem>

            {isShowFinancialInput &&
            <FormItem
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">保存</Button>
              <Button type="primary" htmlType="button">取消</Button>
            </FormItem>
            }
          </Form>
        </div>
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
