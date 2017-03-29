import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Form, Input, Button, Radio, Transfer} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {submitForm, fetchDetail, setForm, updateForm, fetchIndustryList} from '../actions/shield';

class ShieldFormPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mockData: this.props.industryList,
      targetKeys: [],
      isShieldIndustry: this.props.shieldForm.isShieldIndustry || false,
      isShieldUrl: this.props.shieldForm.isShieldUrl || false,
      isCreate: null,
    }

    this.handleIndustryRadioChange = this.handleIndustryRadioChange.bind(this)
    this.handleUrlRadioChange = this.handleUrlRadioChange.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancelSubmit = this.handleCancelSubmit.bind(this)
  }

  // 页面加载完成后执行
  componentDidMount() {
    this.props.fetchIndustryList()

    if (this.context.router.location.pathname.includes('edit')) {
      this.setState({isCreate: false})

      this.props.fetchDetail({id: this.context.router.params.id})
    } else if (this.context.router.location.pathname.includes('new')) {
      this.setState({isCreate: true})

      this.props.setForm({
        id: '',
        isShieldIndustry: '',
        isShieldUrl: '',
        mediaId: '',
        shieldIndustryIds: '',
        title: ''
      })
    }
  }

  // 行业是否屏蔽
  handleIndustryRadioChange(e) {
    e.preventDefault()
    this.props.setForm({isShieldIndustry: e.target.value})
  }

  // 广告主url是否屏蔽
  handleUrlRadioChange(e) {
    e.preventDefault()
    this.props.setForm({isShieldUrl: e.target.value})
  }

  //
  handleChange(nextTargetKeys, direction, moveKeys) {
    this.setState({targetKeys: nextTargetKeys});
  }

  // 处理提交屏蔽策略表单
  handleSubmit(e) {
    e.preventDefault();
    let formValue = this.props.form.getFieldsValue()
    formValue = Object.assign({}, formValue, {
      shieldIndustryIds: this.state.targetKeys.join(',')
    })

    //TODO:如果选择不屏蔽 是否要传入ids值
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.isCreate) {
          this.props.submitForm(formValue)
        } else {// 如果是更新
          formValue = Object.assign({}, formValue, {
            id: this.props.shieldForm.id
          })
          this.props.updateForm(formValue)
        }
      }
    });
  }

  handleCancelSubmit(e) {
    e.preventDefault();
    this.context.router.push('/page/shield/overview')
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
    let {shieldForm, industryList} = this.props;
    const dataSrouce = []


    industryList.data.map((items) => {
      if (items.children && items.children.length) {
        items.children.map((item) => {
          dataSrouce.push(item);
        })
      }
    })

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
              initialValue: shieldForm.title
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
              initialValue: shieldForm.isShieldIndustry
            })(
              <RadioGroup
                onChange={this.handleIndustryRadioChange}
              >
                <Radio value={false}>不屏蔽</Radio>
                <Radio value={true}>屏蔽</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {shieldForm.isShieldIndustry === true &&
          <FormItem
            {...tailFormItemLayout}
          >
            <Transfer
              notFoundContent="列表为空"
              dataSource={dataSrouce}
              titles={['选择行业', '已选行业']}
              showSearch
              listStyle={{
                width: 250,
                height: 300,
              }}
              targetKeys={this.state.targetKeys}
              render={item => `${item.name}`}
              searchPlaceholder="搜索"
              onChange={this.handleChange}
              rowKey={record => record.code}
            />
          </FormItem>
          }


          <FormItem
            label="广告主url屏蔽"
            {...formItemLayout}
          >
            {getFieldDecorator('isShieldUrl', {
              initialValue: shieldForm.isShieldUrl
            })(
              <RadioGroup
                onChange={this.handleUrlRadioChange}
              >
                <Radio value={false}>不屏蔽</Radio>
                <Radio value={true}>屏蔽</Radio>
              </RadioGroup>
            )}
          </FormItem>

          {shieldForm.isShieldUrl === true &&
          <FormItem
            {...tailFormItemLayout}
          >
            {getFieldDecorator('shieldUrls', {
              initialValue: shieldForm.shieldUrls
            })(
              <Input type="textarea" rows={4} placeholder="请输入要屏蔽的广告主url(如www.**.com)，请用“,”分隔多个url"/>
            )}
          </FormItem>
          }

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

ShieldFormPage.contextTypes = {
  router: PropTypes.object.isRequired
};

ShieldFormPage.propTypes = {
  shieldForm: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {shieldForm, industryList} = state;

  return {
    shieldForm,
    industryList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitForm(formValues) {
      dispatch(submitForm(formValues));
    },
    fetchDetail(params){
      dispatch(fetchDetail(params))
    },
    setForm(params){
      dispatch(setForm(params))
    },
    updateForm(params){
      dispatch(updateForm(params))
    },
    fetchIndustryList(){
      dispatch(fetchIndustryList())
    }
  }
}
ShieldFormPage = Form.create()(ShieldFormPage)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShieldFormPage);
