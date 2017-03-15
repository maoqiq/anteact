import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';
import MediaGrid from '../components/MediaGrid';

import {Form, Input, Tooltip, Icon, Checkbox, Button} from 'antd';


class DocViewPage extends Component {
  constructor(props) {
    super(props)

    this.adListActions = [{
      type: 'text',
      label: '名称:',
      placeholder: '请输入屏蔽策略名称'
    }, {
      type: 'button',
      label: '搜索',
    }, {
      type: 'button',
      label: '新建屏蔽策略',
      link: '/shield/new',
      style: {
        float: 'right'
      }
    },]

    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '屏蔽内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '创建日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '操作',
      key: 'actions',
      render: () => (
        <span>
          <Button type="primary" size="small">编辑</Button>
          <Button type="primary" size="small">删除</Button>
        </span>
      )
    }];

    this.dataSource = [{
      key: '1',
      name: '测试广告位',
      content: '所属媒体',
      date: '2017-03-06',
      actions: '修改'
    }];
  }


  render() {
    return (
      <div className="overview shield-overview-page">
        <ListActions FormItems={this.adListActions}/>
        <MediaGrid dataSource={this.dataSource} columns={this.columns}/>
      </div>
    );
  }
}

DocViewPage.propTypes = {
  actions: PropTypes.object.isRequired,
  fuelSavings: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocViewPage);
