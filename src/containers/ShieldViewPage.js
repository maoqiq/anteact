import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {Table, Button, Modal} from 'antd';
const confirm = Modal.confirm;

import {fetchList, deleteItem}from '../actions/shield';
import ShieldSearch from 'components/shield/ShieldSearch'

class ShieldViewPage extends Component {
  constructor(props) {
    super(props)

    this.columns = [{
      title: '策略ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '屏蔽内容',
      key: 'shieldIndustryIds',
      render: (text, record) => (
        <ul>
          {record.isShieldIndustry && <li>行业</li>}
          {record.isShieldUrl && <li>广告主</li>}
        </ul>
      )
    }, {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'actions',
      render: (text, record) => (
        <div className="actions">
          <Button size="small" onClick={this.handleEditItem.bind(this, record)}>编辑</Button>
          <Button size="small" onClick={this.handleDeleteItem.bind(this, record)}>删除</Button>
        </div>
      )
    }];

    this.fetchList = this.fetchList.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  //
  componentWillMount() {
    this.page = parseInt(this.context.router.params.page) || 1
    this.pageSize = 10
    this.fetchList({page: this.page})
  }

  // 获取数据
  fetchList(params) {
    params = Object.assign({}, {
      pageSize: this.pageSize,
      page: 1
    }, params)
    console.log(params)
    this.props.fetchList(params)
  }

  // 进入编辑也
  handleEditItem(record) {
    console.log(record)
    this.context.router.push('/page/shield/edit/' + record.id)
  }

  // 删除单项
  handleDeleteItem(record) {
    const self = this
    confirm({
      title: '确认删除这个项目么?',
      onOk() {
        return self.props.deleteItem({id: record.id})
      },
      onCancel() {
      },
    });
  }

  // 分页
  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter)
    const page = pagination.current
    const pageSize = pagination.pageSize
    console.log(this.fetchList)
    this.fetchList({page: page, pageSize: pageSize})
    this.context.router.push('/page/shield/overview/' + page)
  }

  render() {
    const {shieldList} = this.props;

    return (
      <div className="overview shield-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <ShieldSearch onSearch={this.fetchList}/>
          <Button type="primary">
            <Link to="/page/shield/new">新建屏蔽策略</Link>
          </Button>
        </div>
        <div className="grid shield-grid" style={{padding: '10px 20px'}}>
          <Table rowKey="id"
                 dataSource={shieldList.list}
                 columns={this.columns}
                 pagination={{defaultCurrent: this.page, total: shieldList.totalCount, pageSize: this.pageSize}}
                 onChange={this.handleTableChange}/>
        </div>
      </div>
    );
  }
}

ShieldViewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

ShieldViewPage.propTypes = {
  shieldList: PropTypes.object.isRequired,
  fetchList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {shieldList} = state;
  return {
    shieldList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchList(params) {
      dispatch(fetchList(params));
    },
    deleteItem(params) {
      dispatch(deleteItem(params));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShieldViewPage);
