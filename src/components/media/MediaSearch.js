import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Form, Input, Button} from 'antd'
const FormItem = Form.Item

/**
 * 媒体列表搜索
 */

class MediaSearch extends Component {
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
        <FormItem label="媒体名称" key="media-search-name">
          {getFieldDecorator('name', {})(
            <Input type="text" placeholder="请输入媒体名称"/>
          )}
        </FormItem>
        <FormItem label="媒体ID" key="media-search-id">
          {getFieldDecorator('id', {})(
            <Input type="text" placeholder="请输入媒体ID"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">搜索</Button>
        </FormItem>
      </Form>
    )
  }
}
MediaSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

MediaSearch = Form.create()(MediaSearch)

export default MediaSearch
