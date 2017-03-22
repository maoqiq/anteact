import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Table, Button} from 'antd';

import * as actions from '../actions/fuelSavingsActions';
import ListActions from '../components/ListActions';

import {shieldList} from '../api/mock'
import {fetchList}from '../actions/shield';


class ShieldViewPage extends Component {
  constructor(props) {
    super(props)

    this.shieldListActions = [{
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

  }

  componentDidMount() {
    this.fetchShieldList();
  }

  fetchShieldList() {
    this.props.fetchShieldList()
  }

  render() {
    const {shieldList} = this.props;
    console.log(shieldList)
    return (
      <div className="overview shield-overview-page">
        <ListActions FormItems={this.shieldListActions}/>
        <div className="grid shield-grid" style={{padding: '10px 20px'}}>
          {shieldList.data && shieldList.data.list &&
          <Table rowKey="shieldList" dataSource={shieldList.data.list} columns={this.columns}/>
          }
        </div>
      </div>
    );
  }
}

ShieldViewPage.propTypes = {
  shieldList: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {shieldList} = state;
  return {
    shieldList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchShieldList() {
      dispatch(fetchList({}));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShieldViewPage);
