import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


import {Form, Input, Table, Button} from 'antd';
const FormItem = Form.Item;

import {fetchList, deleteShield}from '../actions/shield';


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
      dataIndex: 'shieldIndustryIds',
      key: 'shieldIndustryIds',
    }, {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: '操作',
      key: 'actions',
      render: (text, record, index) => (
        <span>
          <Button size="small" onClick={this.handleEditItem.bind(this, record)}>编辑</Button>
          <Button size="small" onClick={this.handleDeleteItem.bind(this, record)}>删除</Button>
        </span>
      )
    }];

    this.fetchList = this.fetchList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList(params) {
    params = Object.assign({}, {
      pageSize: 20,
      page: 1
    }, params)

    this.props.fetchList(params)
  }

  // 搜索屏蔽策略
  handleSearch(e) {
    e.preventDefault();
    const formValue = this.props.form.getFieldsValue()
    console.log(formValue)
    this.fetchList(formValue)
  }

  handleEditItem(record) {
    console.log(record)
    this.context.router.push('/page/shield/edit/' + record.id)
  }

  handleDeleteItem(record) {
    this.props.deleteShield({id: record.id})
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {shieldList} = this.props;

    return (
      <div className="overview shield-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <Form className="list-search" layout="inline">
            <FormItem label="名称" key="shield-search-name">
              {getFieldDecorator('title', {})(
                <Input type="text" placeholder="请输入屏蔽策略名称"/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            </FormItem>
            <FormItem className="new">
              <Button type="primary">
                <Link to='/page/shield/new'>新建屏蔽策略</Link>
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className="grid shield-grid" style={{padding: '10px 20px'}}>
          {shieldList.data && shieldList.data.list &&
          <Table rowKey="shieldList" dataSource={shieldList.data.list} columns={this.columns}/>
          }
        </div>
      </div>
    );
  }
}

ShieldViewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

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
    fetchList(params) {
      dispatch(fetchList(params));
    },
    deleteShield(params) {
      dispatch(deleteShield(params));
    },
  }
}

ShieldViewPage = Form.create()(ShieldViewPage)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShieldViewPage);
