import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {Form, Input, Radio, Button, message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {fetchInfo, setFinanceForm, modifyInfo} from '../actions/user'
import UploadImage from '../components/user/UploadImage'

class UserViewPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowBasicInput: false,
      isShowFinancialInput: false,
    }

    this.toggleInputShow = this.toggleInputShow.bind(this)
    this.handleRoleTypeChange = this.handleRoleTypeChange.bind(this)

    this.handleBasicSubmit = this.handleBasicSubmit.bind(this)
    this.handleFinancialSubmit = this.handleFinancialSubmit.bind(this)
    this.handleDraggerChange = this.handleDraggerChange.bind(this)
  }

  // 组件加载完成后执行
  componentDidMount() {
    this.props.fetchInfo()
  }

  // 切换 编辑input 与 显示 的状态
  toggleInputShow(type) {
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
  }

  // 处理 financial info 表单提交
  handleFinancialSubmit(e) {
    e.preventDefault();
    console.log(e.target.name)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      console.log(values)
      values = Object.assign({}, values, {
        licenseUrl: this.props.financeInfo.licenseUrl,
        idCardFrontUrl: this.props.financeInfo.idCardFrontUrl,
        idCardBackUrl: this.props.financeInfo.idCardBackUrl,
      })
      this.setState({isShowFinancialInput: !this.state.isShowFinancialInput})

      this.props.modifyInfo(values)
    })
  }

  // 处理财务对象的改变
  handleRoleTypeChange(e) {
    this.props.setFinanceForm({roleType: e.target.value})
  }

  // 处理dragger
  handleDraggerChange(obj, info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      console.log(info);
      const imgUrl = info.file.response.data;
      this.props.setFinanceForm({[obj]: imgUrl})
      message.success(`${info.file.name}上传成功`);
    } else if (status === 'error') {
      console.log(info);
      message.error(`${info.file.name}上传失败`);
    }
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

    // 设置变量
    const {userInfo, financeInfo} = this.props
    const {getFieldDecorator} = this.props.form
    const isShowBasicInput = this.state.isShowBasicInput
    const isShowFinancialInput = this.state.isShowFinancialInput


    return (
      <div className="overview user-overview">
        <div className="info basic-info">
          <div className="title">
            <span className="text">基本信息</span>
            {/*{!isShowBasicInput &&*/}
            {/*<Button className="button"*/}
            {/*size="small"*/}
            {/*onClick={this.toggleInputShow.bind(this, 'basic')}*/}
            {/*>*/}
            {/*修改*/}
            {/*</Button>*/}
            {/*}*/}
          </div>
          <Form name="basicInfo" onSubmit={this.handleBasicSubmit} className="form" style={{width: '80%'}} noValidate>
            <FormItem
              {...formItemLayout}
              label="公司名称:"
            >
              {isShowBasicInput ?
                (<span>
                    {getFieldDecorator('entName', {
                      rules: [{
                        required: true, message: '请输入公司名称'
                      }],
                      initialValue: userInfo.entName
                    })(
                      <Input type="text" placeholder="请输入公司名称"/>
                    )}
                  </span>)
                : <span>{userInfo.entName}</span>
              }

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系人:"
            >
              {isShowBasicInput ?
                (<span>
                    {getFieldDecorator('name', {
                      rules: [{
                        required: true, message: '请输入联系人'
                      }],
                      initialValue: userInfo.name
                    })(
                      <Input type="text" placeholder="请输入联系人"/>
                    )}
                  </span>)
                : <span>{userInfo.name}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="联系电话:"
            >
              {isShowBasicInput ?
                (<span>
                    {getFieldDecorator('contactTel', {
                      rules: [{
                        required: true, message: '请输入联系电话'
                      }],
                      initialValue: userInfo.contactTel
                    })(
                      <Input type="tel" placeholder="请输入联系电话"/>
                    )}
                  </span>)
                : <span>{userInfo.contactTel}</span>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电子邮箱:"
            >
              {isShowBasicInput ?
                (<span>
                    {getFieldDecorator('contactMail', {
                      rules: [{
                        required: true, message: '请输入邮箱'
                      }],
                      initialValue: userInfo.contactMail
                    })(
                      <Input type="email" placeholder="请输入邮箱"/>
                    )}
                  </span>)
                : <span>{userInfo.contactMail}</span>
              }
            </FormItem>
            {isShowBasicInput &&
            <FormItem
              className="form-actions"
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">保存</Button>
              <Button htmlType="button" onClick={this.toggleInputShow.bind(this, 'basic')}>取消</Button>
            </FormItem>
            }

          </Form>
        </div>
        <div className="info company-info">
          <div className="title">
            <span className="text">财务信息</span>
            {!isShowFinancialInput &&

            <Button className="button"
                    size="small"
                    onClick={this.toggleInputShow.bind(this, 'financial')}
            >
              修改
            </Button>
            }
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
                      initialValue: financeInfo.roleType
                    })(
                      <RadioGroup
                        onChange={this.handleRoleTypeChange}
                      >
                        <Radio value={1}>公司</Radio>
                        <Radio value={2}>个人</Radio>
                      </RadioGroup>
                    )}
                  </span>)
                : <span>{financeInfo.roleType === 2 && <span>个人</span>}{financeInfo.roleType === 1 &&
                <span>公司</span>}</span>
              }
            </FormItem>
            {
              financeInfo.roleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="收款公司名称:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('companyName', {
                      rules: [{
                        required: true, message: '请输入收款公司名称'
                      }],
                      initialValue: financeInfo.companyName
                    })(
                      <Input type="text" placeholder="请输入收款公司名称"/>
                    )}
                  </span>)
                  : <span>{financeInfo.companyName}</span>
                }

              </FormItem>
            }

            {
              financeInfo.roleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="营业执照号:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('registerCode', {
                      rules: [{
                        required: true, message: '请输入营业执照号'
                      }],
                      initialValue: financeInfo.registerCode
                    })(
                      <Input type="text" placeholder="请输入营业执照号"/>
                    )}
                  </span>)
                  : <span>{financeInfo.registerCode}</span>
                }
              </FormItem>
            }
            {
              financeInfo.roleType === 1 &&
              <FormItem
                {...formItemLayout}
                label="营业执照:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('licenseUrl', {
                      rules: [{
                        required: true, message: '请输入营业执照'
                      }],
                      initialValue: financeInfo.licenseUrl
                    })(
                      <UploadImage onChange={this.handleDraggerChange.bind(this, 'licenseUrl')}
                                   imgUrl={financeInfo.licenseUrl}/>
                    )}
                  </span>)
                  : <div className="info-image-wrap" style={{backgroundImage: `url(${financeInfo.licenseUrl})`}}/>
                }
              </FormItem>
            }

            {
              financeInfo.roleType === 2 &&
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
                      initialValue: financeInfo.personalName
                    })(
                      <Input type="tel" placeholder="请输入个人姓名"/>
                    )}
                  </span>)
                  : <span>{financeInfo.personalName}</span>
                }
              </FormItem>
            }
            {
              financeInfo.roleType === 2 &&
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
                      initialValue: financeInfo.idCard
                    })(
                      <Input type="tel" placeholder="请输入身份证号"/>
                    )}
                  </span>)
                  : <span>{financeInfo.idCard}</span>
                }
              </FormItem>
            }
            {
              financeInfo.roleType === 2 &&
              <FormItem
                {...formItemLayout}
                label="身份证正面照:"
              >
                {isShowFinancialInput ?
                  (<span>
                    {getFieldDecorator('idCardFrontUrl', {
                      rules: [{
                        required: true, message: '请上传身份证正面照'
                      }],
                      initialValue: financeInfo.idCardFrontUrl
                    })(
                      <UploadImage onChange={this.handleDraggerChange.bind(this, 'idCardFrontUrl')}
                                   imgUrl={financeInfo.idCardFrontUrl}/>
                    )}
                  </span>)
                  : <div className="info-image-wrap" style={{backgroundImage: `url(${financeInfo.idCardFrontUrl})`}}/>
                }
              </FormItem>
            } {
            financeInfo.roleType === 2 &&
            <FormItem
              {...formItemLayout}
              label="身份证背面照:"
            >
              {isShowFinancialInput ?
                (<span>
                    {getFieldDecorator('idCardBackUrl', {
                      rules: [{
                        required: true, message: '请上传身份证背面照'
                      }],
                      initialValue: financeInfo.idCardBackUrl
                    })(
                      <UploadImage onChange={this.handleDraggerChange.bind(this, 'idCardBackUrl')}
                                   imgUrl={financeInfo.idCardBackUrl}/>
                    )}
                  </span>)
                : <div className="info-image-wrap" style={{backgroundImage: `url(${financeInfo.idCardBackUrl})`}}/>
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
                      initialValue: financeInfo.bankName
                    })(
                      <Input type="text" placeholder="请输入开户行"/>
                    )}
                  </span>)
                : <span>{financeInfo.bankName}</span>
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
                      initialValue: financeInfo.branchName
                    })(
                      <Input type="text" placeholder="请输入支行名称"/>
                    )}
                  </span>)
                : <span>{financeInfo.branchName}</span>
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
                      initialValue: financeInfo.address
                    })(
                      <Input type="text" placeholder="请输入开户行地址"/>
                    )}
                  </span>)
                : <span>{financeInfo.address}</span>
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
                      initialValue: financeInfo.cardNumber
                    })(
                      <Input type="text" placeholder="请输入银行账号"/>
                    )}
                  </span>)
                : <span>{financeInfo.cardNumber}</span>
              }
            </FormItem>

            {isShowFinancialInput &&
            <FormItem
              className="form-actions"
              {...tailFormItemLayout}
            >
              <Button type="primary" htmlType="submit">保存</Button>
              <Button htmlType="button"
                      onClick={this.toggleInputShow.bind(this, 'financial')}>取消</Button>
            </FormItem>
            }
          </Form>
        </div>
      </div>
    );
  }
}

UserViewPage.propTypes = {
  userInfo: PropTypes.object.isRequired,
  financeInfo: PropTypes.object.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  setFinanceForm: PropTypes.func.isRequired,
  modifyInfo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {userInfo, financeInfo} = state;
  return {
    userInfo,
    financeInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInfo() {
      dispatch(fetchInfo({}));
    },
    setFinanceForm(params){
      dispatch(setFinanceForm(params))
    },
    modifyInfo(params){
      dispatch(modifyInfo(params))
    }
  }
}

UserViewPage = Form.create()(UserViewPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserViewPage);
