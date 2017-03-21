import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Table, Icon} from 'antd';


import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';

import {media} from '../api/mock'
import {fetchList}from '../actions/media';

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
      link: '/page/media/new',
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
      dataIndex: 'createTime',
      key: 'createTime',
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
      key: 'status',
      render: (text, record, index) => (
        <span key={index}>
          {record.status ? (
              <span>审核中</span>
            ) : (
              <span>开启</span>
            )}
        </span>
      )
    }, {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
    },];
    this.fetchMediaList = this.fetchMediaList.bind(this);
  }

  componentDidMount() {
    this.fetchMediaList();
  }

  fetchMediaList() {
    this.props.fetchMediaList()
  }

  render() {
    const {mediaList} = this.props;
    return (
      <div className="media-overview-page">
        <ListActions FormItems={this.mediaListActions}/>
        <div className="grid media-grid" style={{padding: '10px 20px'}}>
          {mediaList.data && mediaList.data.list &&
          <Table rowKey="mediaList" dataSource={mediaList.data.list} columns={this.columns}/>
          }
        </div>
      </div>
    )
  }
}

MediaViewPage.propTypes = {
  mediaList: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {mediaList} = state;

  return {
    mediaList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMediaList() {
      dispatch(fetchList());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewPage);
