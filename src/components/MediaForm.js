import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {Radio} from 'antd';
const RadioGroup = Radio.Group;

class MediaForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form className="form media-form">
        <FormItem
          label="媒体名称"
          hasFeedback
        >
          <Input type="text" placeholder="请输入媒体名称，不超过10个字"/>
        </FormItem>
        <FormItem
          label="系统平台"
          hasFeedback
        >
          <RadioGroup >
            <Radio value={1}>Android</Radio>
            <Radio value={2}>IOS</Radio>
            <Radio value={3}>HTML</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="程序主包名"
          hasFeedback
        >
          <Input type="text" placeholder="请输入媒体程序的主包名，如果不清楚请询问开发同学"/>
        </FormItem>

        <FormItem
          label="媒体关键词"
        >
          <Input type="text" placeholder="0-20个字符，每个分割词之间用“,”分隔"/>
        </FormItem>

        <FormItem
          label="媒体简介"
        >
          <Input type="textarea" rows={4}/>
        </FormItem>

        <FormItem
          label="下载地址"
        >
          <Input type="text" placeholder="请输入下载地址"/>
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">提交审核</Button>
          <Button type="primary" htmlType="button">取消</Button>
        </FormItem>

      </Form>
    );
  }
}

export default MediaForm;
