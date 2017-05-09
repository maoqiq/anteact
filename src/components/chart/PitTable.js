import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Upload, Icon, Table} from 'antd';
const Dragger = Upload.Dragger;


class PitChart extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '广告位ID',
        dataIndex: 'pitId',
        key: 'pitId',
      }, {
        title: '广告位名称',
        dataIndex: 'pitName',
        key: 'pitName',
      }, {
        title: '广告位规格',
        key: 'spec',
        render: (value, record, index) => {
          return <span>{record.specWidth}(宽度)*{record.specHeight}(高度)</span>
        }
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
      <Table rowKey="pitId" dataSource={this.props.dataSource} columns={this.columns}/>
    )
  }
}

export default PitChart
