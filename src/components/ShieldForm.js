import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio, Transfer} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class ShieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
    }
  }

  render() {
    return (
      <Form className="form media-form">
        <FormItem
          label="名称"
          hasFeedback
        >
          <Input type="text" placeholder="请输入屏蔽策略名称，不超过20个字"/>
        </FormItem>
        <FormItem
          label="系统平台"
          hasFeedback
        >
          <RadioGroup >
            <Radio value={1}>不屏蔽</Radio>
            <Radio value={2}>屏蔽</Radio>
          </RadioGroup>

          <Transfer
            dataSource={this.state.mockData}
            showSearch
            listStyle={{
              width: 250,
              height: 300,
            }}
            targetKeys={this.state.targetKeys}
            render={item => `${item.title}-${item.description}`}
          />
        </FormItem>


        <FormItem
          label="广告主url屏蔽"
        >
          <RadioGroup >
            <Radio value={1}>不屏蔽</Radio>
            <Radio value={2}>屏蔽</Radio>
          </RadioGroup>
          <Input type="textarea" rows={4}/>
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="primary" htmlType="button">取消</Button>
        </FormItem>

      </Form>
    );
  }
}

export default ShieldForm;
