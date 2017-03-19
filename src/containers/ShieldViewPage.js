import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Table, Button} from 'antd';

import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';

import {shieldList} from '../api/mock'



class ShieldViewPage extends Component {
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
      link: '/page/shield/new',
      style: {
        float: 'right'
      }
    },]

    this.columns = [{
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '屏蔽内容',
      dataIndex: 'shieldIndustryIds',
      key: 'shieldIndustryIds',
    }, {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
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


    this.dataSource = shieldList.data.list
    console.log(shieldList.data.list)
  }


  render() {
    return (
      <div className="overview shield-overview-page">
        <ListActions FormItems={this.adListActions}/>
        <div className="grid shield-grid" style={{padding: '10px 20px'}}>
          <Table dataSource={this.dataSource} columns={this.columns}/>
        </div>
      </div>
    );
  }
}

ShieldViewPage.propTypes = {
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
)(ShieldViewPage);
