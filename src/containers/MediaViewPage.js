import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';
import MediaGrid from '../components/MediaGrid';

class MediaViewPage extends Component {
  constructor(props) {
    super(props)
    this.mediaListActions = [{
      type: 'text',
      label: '媒体名称:',
      placeholder: '请输入媒体名称'
    }, {
      type: 'text',
      label: '媒体ID:',
      placeholder: '请输入媒体ID'
    }, {
      type: 'button',
      label: '搜索'
    }, {
      type: 'button',
      label: '新建媒体',
      link: '/media/new',
      style: {
        float: 'right'
      }
    }]

    this.columns = [{
      title: '媒体名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
    }, {
      title: 'appKey',
      dataIndex: 'appKey',
      key: 'appKey',
    }, {
      title: 'appSecret',
      dataIndex: 'appSecret',
      key: 'appSecret',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
    },];

    this.dataSource = [{
      key: '1',
      name: '测试1',
      time: '2017-03-06',
      platform: 'H5',
      appKey: '2y1F6B3y7Yqvbx8WyyJNZsAMFcsm',
      appSecret: '3WoojyPa68TJs1W2foDHYnoZxQcg96nmRjBw6ZC',
      status: '审核中',
      actions: '删除'
    }];
  }

  render() {
    return (
      <div className="media-overview-page">
        <ListActions FormItems={this.mediaListActions}/>
        <MediaGrid dataSource={this.dataSource} columns={this.columns}/>
      </div>
    )
  }
}

MediaViewPage.propTypes = {
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
)(MediaViewPage);
