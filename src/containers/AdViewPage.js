import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Table, Icon} from 'antd';

import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';


import {adList} from '../api/mock'


import {Switch} from 'antd';

class AdViewPage extends Component {
  constructor(props) {
    super(props)

    this.adListActions = [{
      type: 'text',
      label: '名称:',
      placeholder: '请输入广告位名称'
    }, {
      type: 'text',
      label: 'ID:',
      placeholder: '请输入广告位ID'
    }, {
      type: 'select',
      label: '状态:',
      options: [{
        value: 'all',
        label: '全部广告'
      }, {
        value: 'open',
        label: '开启'
      }, {
        value: 'close',
        label: '关闭'
      },]
    }, {
      type: 'button',
      label: '搜索',
    }, {
      type: 'button',
      label: '新建广告位',
      link: '/page/ad/new',
      style: {
        float: 'right'
      }
    },]

    this.columns = [{
      title: '广告位名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所属媒体',
      dataIndex: 'appName',
      key: 'appName',
    }, {
      title: '广告位规格',
      dataIndex: 'adSpecName',
      key: 'adSpecName',
    }, {
      title: '修改日期',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: '广告位状态',
      key: 'status',
      render: (text, record, index) => (
        <span>
          <Switch defaultChecked={record.status === 1}/>
        </span>
      )
    }, {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
    }];


    this.dataSource = adList.data.list
    console.log(adList.data.list)
  }


  render() {
    return (
      <div className="overview media-overview-page">
        <ListActions FormItems={this.adListActions}/>
        <div className="grid ad-grid" style={{padding: '10px 20px'}}>
          <Table dataSource={this.dataSource} columns={this.columns}/>
        </div>
      </div>
    );
  }
}

AdViewPage.propTypes = {
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
)(AdViewPage);
