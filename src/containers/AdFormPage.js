import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {Form, Input, Select, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
import {Radio} from 'antd';
const RadioGroup = Radio.Group;

import {fetchList as fetchMediaList}  from '../actions/media'
import {fetchList as fetchShieldList}  from '../actions/shield'
import {submitForm}  from '../actions/ad'

class AdFormPage extends Component {
  constructor(props) {
    super(props)
    this.fetchMediaList = this.props.fetchMediaList.bind(this);
    this.fetchShieldList = this.props.fetchShieldList.bind(this);
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)

  }

  componentDidMount() {
    this.fetchMediaList()
    this.fetchShieldList()
  }

  handleCancelSubmit(e) {
    e.preventDefault();
    this.context.router.push('/page/ad/overview')
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    let mediaList = [], shieldList = [];
    // 设置媒体列表 屏蔽列表
    if (this.props.mediaList.data && this.props.mediaList.data.list) {
      mediaList = this.props.mediaList.data.list;
    }

    if (this.props.shieldList.data && this.props.shieldList.data.list) {
      shieldList = this.props.shieldList.data.list;
    }
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
        <Form className="form ad-form" style={{width: '60%'}}>
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
                required: true, message: '请输入广告名称',
              }],
            })(
              <Select>
                {
                  mediaList.map((value, index) => (
                    <Option value={index.toString()} key={`ad-select-${index}`}>{value.name}</Option>
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
            })(
              <RadioGroup >
                <Radio value={1}>SDK投放</Radio>
                <Radio value={2}>手动投放</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem
            label="屏蔽策略"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('appId', {
              rules: [{
                required: true, message: '请输入广告名称',
              }],
            })(
              <Select>
                {
                  shieldList.map((value, index) => (
                    <Option value={index.toString()} key={`ad-select-${index}`}>{value.title}</Option>
                  ))
                }
              </Select>
            )}
            <Button type="primary" htmlType="button">
              <Link to="/page/shield/new">新建屏蔽策略+</Link>
            </Button>

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
};

function mapStateToProps(state) {
  const {adForm, mediaList, shieldList} = state;
  return {
    adForm,
    mediaList,
    shieldList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitAdForm(formValues) {
      dispatch(submitForm(formValues));
    },
    fetchMediaList(){
      dispatch(fetchMediaList());
    },
    fetchShieldList(){
      dispatch(fetchShieldList());
    }
  }
}


AdFormPage = Form.create()(AdFormPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdFormPage);
