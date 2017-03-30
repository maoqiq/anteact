import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Form, Input, Table, Button, Switch, Pagination} from 'antd';
const FormItem = Form.Item;

import {fetchList, updateForm, deleteItem, enableStatus, disableStatus}from '../actions/media';

class MediaViewPage extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '媒体ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '媒体名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      }, {
        title: '平台',
        dataIndex: 'platformText',
        key: 'platformText',
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
          <span>
          <Switch defaultChecked={record.status === 1} onChange={this.handleSwitchChange.bind(this, record)}/>
        </span>
        )
      }, {
        title: '操作',
        key: 'actions',
        render: (text, record, index) => (
          <span>
          <Button size="small" onClick={this.handleEditItem.bind(this, record)}>编辑</Button>
          <Button size="small" disabled={record.status === 1}
                  onClick={this.handleDeleteItem.bind(this, record)}>删除</Button>
        </span>
        )
      },];

    this.fetchMediaList = this.fetchMediaList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    console.log(this.context.router)
    this.page = parseInt(this.context.router.params.id) || 1
    this.fetchMediaList({page: this.page})
  }

  fetchMediaList(params) {
    params = Object.assign({}, {
      pageSize: 10,
      page: 1
    }, params)
    this.props.fetchMediaList(params)

  }

  // 搜索
  handleSearch(e) {
    e.preventDefault();
    const formValue = this.props.form.getFieldsValue()
    this.fetchMediaList(formValue)
  }

  // 编辑媒体项目
  handleEditItem(record) {
    console.log(record)
    this.context.router.push('/page/media/edit/' + record.id)
  }

  handleDeleteItem(record, status) {
    this.props.deleteItem({id: record.id})
  }

  // 切换媒体状态
  handleSwitchChange(record, status) {
    console.log(record, status)
    if (status) {
      this.props.enableStatus({id: record.id})
    } else {
      this.props.disableStatus({id: record.id})
    }
  }

  // 分页
  handleTableChange(pagination, filters, sorter) {
    console.log(pagination, filters, sorter)
    const page = pagination.current
    const pageSize = pagination.pageSize
    this.fetchMediaList({page: page, pageSize: pageSize})
    this.context.router.push('/page/media/overview/' + page)
  }

  render() {
    const {mediaList} = this.props;
    console.log(mediaList)
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="overview media-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <Form className="list-search" layout="inline">
            <FormItem label="媒体名称" key="media-search-name">
              {getFieldDecorator('name', {})(
                <Input type="text" placeholder="请输入媒体名称"/>
              )}
            </FormItem>
            <FormItem label="媒体ID" key="media-search-id">
              {getFieldDecorator('id', {})(
                <Input type="text" placeholder="请输入媒体ID"/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            </FormItem>
            <FormItem className="new">
              <Button type="primary">
                <Link to='/page/media/new'>新建媒体</Link>
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className="grid media-grid" style={{padding: '10px 20px'}}>
          {mediaList.data && mediaList.data.list &&
          <div>
            <Table rowKey="id"
                   dataSource={mediaList.data.list}
                   columns={this.columns}
                   pagination={{defaultCurrent: this.page, total: mediaList.data.totalCount, pageSize: 10}}
                   onChange={this.handleTableChange}/>
          </div>
          }
        </div>
      </div>
    )
  }
}
MediaViewPage.contextTypes = {
  router: PropTypes.object.isRequired
};

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
    fetchMediaList(params) {
      dispatch(fetchList(params));
    },
    updateForm(params){
      dispatch(updateForm(params))
    },
    deleteItem(params){
      dispatch(deleteItem(params))
    },
    enableStatus(params){
      dispatch(enableStatus(params))
    },
    disableStatus(params){
      dispatch(disableStatus(params))
    },
  }
}

MediaViewPage = Form.create()(MediaViewPage)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewPage);
