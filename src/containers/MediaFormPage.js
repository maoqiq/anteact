import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Form, Input, Button, Radio} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {submitForm}from '../actions/media';

class MediaFormPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const formValue = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      this.props.submitMediaForm(formValue)
      if (!err) {
        console.log(formValue)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="media-form-page" style={{padding: '10px'}}>
        <Form onSubmit={this.handleSubmit} className="form media-form">
          <FormItem
            label="媒体名称"
            hasFeedback
          >
            {getFieldDecorator('appName', {
              rules: [{
                required: true, message: '请输入媒体名称',
              }],
            })(
              <Input type="text" placeholder="请输入媒体名称，不超过10个字"/>
            )}
          </FormItem>
          <FormItem
            label="系统平台"
            hasFeedback
          >
            {getFieldDecorator('platform', {
              rules: [
                {required: true, message: '请选择系统平台'},
              ],
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
          >
            {getFieldDecorator('appPackage', {
              rules: [{
                required: true, message: '请输入媒体程序主包名',
              }],
            })(
              <Input type="text" placeholder="请输入媒体程序的主包名，如果不清楚请询问开发同学"/>
            )}
          </FormItem>

          <FormItem
            label="媒体关键词"
            hasFeedback
          >
            {getFieldDecorator('appKeywords', {
              rules: [{
                required: true, message: '请输入媒体关键词',
              }],
            })(
              <Input type="text" placeholder="请输入媒体关键词，0-20个字符，每个分割词之间用“,”分隔"/>
            )}
          </FormItem>

          <FormItem
            label="媒体简介"
            hasFeedback
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入媒体简介',
              }],
            })(
              <Input type="textarea" rows={4} placeholder="正确地填写媒体简介能够提高广告的匹配度及收益，至少40个字"/>
            )}
          </FormItem>

          <FormItem
            label="下载地址"
            hasFeedback
          >
            {getFieldDecorator('downloadUrl', {
              rules: [{
                required: true, message: '请输入下载地址', type: 'url'
              }],
            })(
              <Input type="text" placeholder="请输入下载地址"/>
            )}
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">提交审核</Button>
            <Button type="primary" htmlType="button">取消</Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}


MediaFormPage.propTypes = {
  // actions: PropTypes.object.isRequired,
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
  }
}

MediaFormPage = Form.create()(MediaFormPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaFormPage);
