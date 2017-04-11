import React, {Component, PropTypes} from 'react';

import {Form, Input, Button} from 'antd'
const FormItem = Form.Item

class ShieldSearch extends Component {
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
        <FormItem label="名称" key="shield-search-name">
          {getFieldDecorator('title', {})(
            <Input type="text" placeholder="请输入屏蔽策略名称"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
        </FormItem>

      </Form>
    )
  }
}
ShieldSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

ShieldSearch = Form.create()(ShieldSearch)


export default ShieldSearch
