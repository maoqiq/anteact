import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Form, Input, Button, Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {submitForm, fetchDetail} from '../actions/media';

class MediaFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreate: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)
  }

  componentDidMount() {
    if (this.context.router.location.pathname.includes('edit')) {
      this.setState({isCreate: false})
      this.props.fetchDetail({id: this.context.router.params.id})

    } else if (this.context.router.location.pathname.includes('new')) {
      this.setState({isCreate: true})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (err) {
        // return
      }
      const formValue = values;
      console.log(formValue);
      this.props.submitMediaForm(formValue)

    });
  }

  handleCancelSubmit(e) {
    e.preventDefault();
    this.context.router.push('/page/media/overview')
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
    const {mediaForm} = this.props

    return (
      <div className="form-page" style={{padding: '10px'}}>
        <Form onSubmit={this.handleSubmit} className="form media-form" style={{width: '80%'}}>
          <FormItem
            label="媒体名称"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('appName', {
              rules: [{
                required: true, message: '请输入媒体名称',
              }],
              initialValue: mediaForm.appName
            })(
              <Input type="text" placeholder="请输入媒体名称，不超过10个字"/>
            )}
          </FormItem>
          <FormItem
            label="系统平台"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('platform', {
              rules: [
                {required: true, message: '请选择系统平台'},
              ],
              initialValue: mediaForm.platform
            })(
              <RadioGroup>
                <Radio value={1}>Android</Radio>
                <Radio value={2}>IOS</Radio>
                <Radio value={3}>HTML</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="程序主包名"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('appPackage', {
              rules: [{
                required: true, message: '请输入媒体程序主包名',
              }],
              initialValue: mediaForm.appPackage
            })(
              <Input type="text" placeholder="请输入媒体程序的主包名，如有疑问请询问技术人员"/>
            )}
          </FormItem>

          <FormItem
            label="媒体关键词"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('appKeyWords', {
              rules: [{
                required: true, message: '请输入媒体关键词',
              }],
              initialValue: mediaForm.appKeyWords
            })(
              <Input type="text" placeholder="请输入媒体关键词，0-20个字符，每个分割词之间用“,”分隔"/>
            )}
          </FormItem>

          <FormItem
            label="媒体简介"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入媒体简介',
              }],
              initialValue: mediaForm.description

            })(
              <Input type="textarea" rows={4} placeholder="正确地填写媒体简介能够提高广告的匹配度及收益，至少40个字"/>
            )}
          </FormItem>

          <FormItem
            label="下载地址"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('downloadUrl', {
              rules: [{
                required: true, message: '请输入下载地址', type: 'url'
              }],
              initialValue: mediaForm.downloadUrl
            })(
              <Input type="text" placeholder="请输入下载地址"/>
            )}
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
MediaFormPage.contextTypes = {
  router: PropTypes.object.isRequired
};

MediaFormPage.propTypes = {
  mediaForm: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {mediaForm} = state;

  return {
    mediaForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitMediaForm(formValues) {
      dispatch(submitForm(formValues));
    },
    fetchDetail(params) {
      dispatch(fetchDetail(params));
    },

  }
}

MediaFormPage = Form.create()(MediaFormPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaFormPage);
