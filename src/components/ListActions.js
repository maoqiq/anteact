import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class ListActions extends Component {
  constructor(props) {
    super(props)
    console.log('%c Ad ListActions', 'color: #F95392', props);

    this.formItems = props.FormItems.map((value, key) => {
      switch (value.type) {
        case 'text':
          return (
            <FormItem label={value.label} key={`ad-list-actions-${value.label}-${key}`}>
              <Input type="text" placeholder={value.placeholder}/>
            </FormItem>
          )
          break;
        case 'button':
          if (value.link) {
            return (
              <FormItem key={`ad-list-actions-${value.label}-${key}`} style={value.style}>
                <Button type="primary">
                  <Link to={value.link}>{value.label}</Link>
                </Button>
              </FormItem>
            )
          }
          return (
            <FormItem key={`ad-list-actions-${value.label}-${key}`} style={value.style}>
              <Button type="primary">{value.label}</Button>
            </FormItem>
          )
          break;
        case 'select':
          return (
            <FormItem label={value.label} key={`ad-list-actions-${value.label}-${key}`}>
              <Select initialValue="all" style={{width: 120}}>
                {
                  value.options.map((value, index) => (
                    <Option value={value.value} key={`ad-select-${value.value}-${index}`}>{value.label}</Option>
                  ))
                }
              </Select>
            </FormItem>
          )
          break;
        default:
          break;
      }
    })
  }

  render() {
    return (
      <div className="list-actions" style={{padding: '10px 20px'}}>
        <form action="" className="search-form ant-form-inline">
          {this.formItems}
        </form>

      </div>
    );
  }
}


export default ListActions;
