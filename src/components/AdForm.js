import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

import {Radio} from 'antd';
const RadioGroup = Radio.Group;

class AdForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form className="form ad-form" style={{width: 400}}>
        <FormItem
          label="广告位名称:"
          hasFeedback
        >
          <Input type="text" placeholder="请输入广告名称，不超过20个字"/>
        </FormItem>

        <FormItem
          label="媒体选择"
          hasFeedback
        >
          <Select defaultValue="all" >
            <Option value="meiti">meiti</Option>
            <Option value="231">1111 </Option>
            <Option value="234235">222222</Option>
          </Select>
        </FormItem>

        <FormItem
          label="投放类型"
          hasFeedback
        >
          <RadioGroup >
            <Radio value={1}>SDK投放</Radio>
            <Radio value={2}>手动投放</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem
          label="屏蔽策略"
          hasFeedback
        >
          <Select defaultValue="all">
            <Option value="meiti">meiti</Option>
            <Option value="231">1111 </Option>
            <Option value="234235">222222</Option>
          </Select>
          <Button type="primary" htmlType="button">新建屏蔽策略+</Button>

        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="primary" htmlType="button">取消</Button>
        </FormItem>

      </Form>
    );
  }
}

export default AdForm;
