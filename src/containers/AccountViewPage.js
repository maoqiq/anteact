import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';
import MediaGrid from '../components/MediaGrid';


import {Switch} from 'antd';

class AccountViewPage extends Component {
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
      link: '/ad/new',
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
      dataIndex: 'mediaId',
      key: 'mediaId',
    }, {
      title: '广告位规格',
      dataIndex: 'adSize',
      key: 'adSize',
    }, {
      title: '修改日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '广告位状态',
      key: 'status',
      render: () => (
        <span>
          <Switch defaultChecked={false}/>
        </span>
      )
    }, {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
    }];

    this.dataSource = [{
      key: '1',
      name: '测试广告位',
      mediaId: '所属媒体',
      adSize: '浮标（尺寸150*150）',
      date: '2017-03-06',
      status: true,
      actions: '修改'
    }];
  }


  render() {
    return (
      <div className="overview account-overview-page">
        <h1>账号信息</h1>
      </div>
    );
  }
}

AccountViewPage.propTypes = {
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
)(AccountViewPage);
