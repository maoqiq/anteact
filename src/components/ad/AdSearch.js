import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Form, Input, Button, Select} from 'antd'
const FormItem = Form.Item

class AdSearch extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
  }

  search(e) {
    e.preventDefault()
    const formValue = this.props.form.getFieldsValue()
    this.props.onSearch.call(this, formValue)
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return (
      <Form className="list-search" layout="inline" onSubmit={this.search}>
        <FormItem label="名称" key="ad-search-name">
          {getFieldDecorator('name', {})(
            <Input type="text" placeholder="请输入广告位名称"/>
          )}
        </FormItem>
        <FormItem label="ID" key="ad-search-id">
          {getFieldDecorator('id', {})(
            <Input type="text" placeholder="请输入广告位ID"/>
          )}
        </FormItem>
        <FormItem label="状态" key="ad-search-status">
          {getFieldDecorator('status', {
            initialValue: ''
          })(
            <Select style={{width: 120}}>
              <Option value="">全部广告</Option>
              <Option value="1">开启</Option>
              <Option value="0">关闭</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
        </FormItem>
      </Form>
    )
  }
}
AdSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

AdSearch = Form.create()(AdSearch)


export default AdSearch
