import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Form, Input, Button, Radio, Transfer} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {submitForm} from '../actions/shield';

class ShieldFormPage extends Component {
  constructor(props) {
    super(props)

    const mockData = [];
    for (let i = 0; i < 10; i++) {
      mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
      });
    }
    const targetKeys = mockData
      .filter(item => +item.key % 3 > 1)
      .map(item => item.key);

    this.state = {
      mockData: mockData,
      targetKeys: targetKeys,
      isShieldIndustry: 0,
      isShieldUrl: 0
    }

    this.handleIndustryRadioChange = this.handleIndustryRadioChange.bind(this)
    this.handleUrlRadioChange = this.handleUrlRadioChange.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleIndustryRadioChange(e) {
    e.preventDefault()
    this.setState({
      isShieldIndustry: e.target.value
    })
  }

  handleUrlRadioChange(e) {
    e.preventDefault()
    this.setState({
      isShieldUrl: e.target.value
    })
  }

  handleChange(nextTargetKeys, direction, moveKeys) {
    this.setState({targetKeys: nextTargetKeys});
  }


  handleSubmit(e) {
    e.preventDefault();
    const formValue = this.props.form.getFieldsValue()
    const _submit = Object.assign({}, formValue, {
      shieldIndustryIds: this.state.targetKeys
    })
    //TODO:如果选择不屏蔽 是否要传入ids值
    console.log(_submit)
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
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="form-page" style={{padding: '10px'}}>
        <Form onSubmit={this.handleSubmit} className="form" style={{width: '80%'}}>
          <FormItem
            label="名称"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入屏蔽策略名称',
              }],
            })(
              <Input type="text" placeholder="请输入屏蔽策略名称，不超过20个字"/>
            )}

          </FormItem>

          <FormItem
            label="行业屏蔽"
            hasFeedback
            {...formItemLayout}
          >
            {getFieldDecorator('isShieldIndustry', {
              initialValue: 0
            })(
              <RadioGroup
                onChange={this.handleIndustryRadioChange}
              >
                <Radio value={0}>不屏蔽</Radio>
                <Radio value={1}>屏蔽</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {this.state.isShieldIndustry === 1 &&
          <FormItem
            {...tailFormItemLayout}
          >
            <Transfer
              dataSource={this.state.mockData}
              titles={['选择行业', '已选行业']}
              showSearch
              listStyle={{
                width: 250,
                height: 300,
              }}
              targetKeys={this.state.targetKeys}
              render={item => `${item.title}`}
              searchPlaceholder="搜索"
              onChange={this.handleChange}
            />
          </FormItem>
          }


          <FormItem
            label="广告主url屏蔽"
            {...formItemLayout}
          >
            {getFieldDecorator('isShieldUrl', {
              initialValue: 0
            })(
              <RadioGroup
                onChange={this.handleUrlRadioChange}
              >
                <Radio value={0}>不屏蔽</Radio>
                <Radio value={1}>屏蔽</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {this.state.isShieldUrl === 1 &&
          <FormItem
            {...tailFormItemLayout}
          >
            {getFieldDecorator('shieldUrls', {})(
              <Input type="textarea" rows={4} placeholder="请输入要屏蔽的广告主url(如www.**.com)，请用“，”分隔多个url"/>
            )}
          </FormItem>
          }

          <FormItem
            {...tailFormItemLayout}
          >
            <Button type="primary" htmlType="submit">提交</Button>
            <Button type="primary" htmlType="button">取消</Button>
          </FormItem>

        </Form>
      </div>
    );
  }
}


ShieldFormPage.propTypes = {
  shieldForm: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {shieldForm} = state;

  return {
    shieldForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitMediaForm(formValues) {
      dispatch(submitForm(formValues));
    },
  }
}

ShieldFormPage = Form.create()(ShieldFormPage)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShieldFormPage);
