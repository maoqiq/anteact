import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {Form, Input, Select, Button, Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

import {fetchList as fetchMediaList}  from '../actions/media'
import {fetchList as fetchShieldList}  from '../actions/shield'
import {submitForm, fetchDetail, updateForm, fetchSpecList}  from '../actions/ad'

// 广告位表单
class AdFormPage extends Component {
  constructor(props) {
    super(props)
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      isCreate: null,
      isShowSpec: true
    }
  }


  componentWillMount() {
    this.props.clearForm()
  }


// 页面加载完成后执行
  componentDidMount() {
    this.props.fetchMediaList({page: 1, pageSize: 50})
    this.props.fetchShieldList({page: 1, pageSize: 50})
    this.props.fetchSpecList()

    if (this.context.router.location.pathname.includes('edit')) {
      this.setState({isCreate: false})
      this.props.fetchDetail({id: this.context.router.params.id})
    } else if (this.context.router.location.pathname.includes('new')) {
      this.setState({isCreate: true})
    }
  }

  handleCancelSubmit(e) {
    e.preventDefault();
    this.context.router.push('/page/ad/overview')
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }
      let formValue = values;
      if (this.state.isCreate) {
        this.props.submitForm(formValue)
      } else {// 如果是更新
        formValue = Object.assign({}, formValue, {
          id: this.props.adForm.id
        })
        this.props.updateForm(formValue)
      }

    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let mediaList = [], shieldList = [], specList = [];
    // 设置媒体列表 屏蔽列表
    if (this.props.mediaList.list) {
      mediaList = this.props.mediaList.list;
    }

    if (this.props.shieldList.list) {
      shieldList = this.props.shieldList.list;
    }

    if (this.props.specList.data) {
      specList = this.props.specList.data;
    }
    const {adForm} = this.props

    // form 布局
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
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <div className="form-page" style={{padding: '10px'}}>
        <Form
          onSubmit={this.handleSubmit}
          className="form ad-form"
          style={{width: '70%'}}>
          <FormItem
            label="广告位名称:"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入广告名称',
              }, {
                max: 20, message: '请输入不超过20个字的名称'
              }],
              initialValue: adForm.name
            })(
              <Input type="text" placeholder="请输入广告名称，不超过20个字"/>
            )}
          </FormItem>

          <FormItem
            label="媒体选择"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('appId', {
              rules: [{
                required: true, message: '请选择媒体',
              }],
              initialValue: adForm.appId
            })(
              <Select disabled={!this.state.isCreate}>
                {
                  mediaList.map((value) => (
                    <Option key={value.id} value={value.id}>{value.name}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>

          <FormItem
            label="投放类型"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('putType', {
              rules: [{
                required: true, message: '请选择投放方式',
              }],
              initialValue: adForm.putType
            })(
              <RadioGroup disabled={!this.state.isCreate}>
                <Radio value={1}>SDK投放</Radio>
                <Radio value={2}>手动投放</Radio>
              </RadioGroup>
            )}
          </FormItem>


          {this.state.isShowSpec &&
          <FormItem
            label="广告规格"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('adSpecId', {
              rules: [{
                required: true, message: '请选择广告规格',
              }],
              initialValue: adForm.adSpecId
            })(
              <Select disabled={!this.state.isCreate}>
                {
                  specList.map((value) => (
                    <Option key={value.id} value={value.id}>{value.title}-{value.width}(宽度)*{value.height}(高度)</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          }
          <FormItem
            label="屏蔽策略"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('shieldId', {
              rules: [{
                required: true, message: '请选择屏蔽策略',
              }],
              initialValue: adForm.shieldId
            })(
              <Select>
                {
                  shieldList.map((value) => (
                    <Option key={value.id} value={value.id}>id:{value.id}-名称:{value.title}</Option>
                  ))
                }
              </Select>
            )}
            <Link to="/page/shield/new">新建屏蔽策略 ></Link>
          </FormItem>

          <FormItem
            className="form-actions"
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit">提交</Button>
            <Button htmlType="button" onClick={this.handleCancelSubmit}>取消</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

AdFormPage.contextTypes = {
  router: PropTypes.object.isRequired
}

AdFormPage.propTypes = {
  adForm: PropTypes.object.isRequired,
  mediaList: PropTypes.object.isRequired,
  shieldList: PropTypes.object.isRequired,

  submitForm: PropTypes.func.isRequired,
  fetchMediaList: PropTypes.func.isRequired,
  fetchShieldList: PropTypes.func.isRequired,
  fetchDetail: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  fetchSpecList: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {adForm, mediaList, shieldList, specList} = state;
  return {
    adForm,
    mediaList,
    shieldList,
    specList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitForm(formValues) {
      dispatch(submitForm(formValues));
    },
    fetchMediaList(params){
      dispatch(fetchMediaList(params));
    },
    fetchShieldList(params){
      dispatch(fetchShieldList(params));
    },
    fetchDetail(params){
      dispatch(fetchDetail(params));
    },
    updateForm(params){
      dispatch(updateForm(params));
    },
    fetchSpecList(params){
      dispatch(fetchSpecList(params));
    },
    clearForm(){
      dispatch({
        type: 'CLEAR_ALL',
      })
    },

  }
}


AdFormPage = Form.create()(AdFormPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdFormPage);
