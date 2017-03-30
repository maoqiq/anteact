import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Upload, Icon, Table} from 'antd';
const Dragger = Upload.Dragger;


class AppChart extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '媒体ID',
        dataIndex: 'appId',
        key: 'appId',
      }, {
        title: '媒体名称',
        dataIndex: 'appName',
        key: 'appName',
      }, {
        title: '曝光量',
        dataIndex: 'exposureCount',
        key: 'exposureCount',
      }, {
        title: '点击数',
        dataIndex: 'clickCount',
        key: 'clickCount',
      }, {
        title: '点击率',
        dataIndex: 'clickRate',
        key: 'clickRate',
      },]
  }

  render() {
    return (
      <Table rowKey="appId" dataSource={this.props.dataSource} columns={this.columns}/>
    )
  }
}

export default AppChart
