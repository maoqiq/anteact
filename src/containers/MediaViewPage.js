import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import {Form, Input, Table, Button, Switch, Modal} from 'antd'
const FormItem = Form.Item
const confirm = Modal.confirm

import {fetchList, updateForm, deleteItem, enableStatus, disableStatus}from '../actions/media'

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
        render: (text, record) => (
          <span>
          <Switch defaultChecked={record.status === 1} onChange={this.handleSwitchChange.bind(this, record)}/>
        </span>
        )
      }, {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <div className="actions">
            <Button size="small" onClick={this.handleEditItem.bind(this, record)}>编辑</Button>
            <Button size="small" disabled={record.status === 1}
                    onClick={this.handleDeleteItem.bind(this, record)}>删除</Button>
          </div>
        )
      },]

    this.fetchList = this.fetchList.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
  }

  componentWillMount() {
    this.page = parseInt(this.context.router.params.page) || 1
    this.pageSize = 20
    this.fetchList({page: this.page})
  }

  // 拉取数据
  fetchList(params) {
    params = Object.assign({}, {
      pageSize: this.pageSize,
      page: 1
    }, params)
    this.props.fetchList(params)
  }

  // 搜索
  handleSearch(e) {
    e.preventDefault()
    const formValue = this.props.form.getFieldsValue()
    this.fetchList(formValue)
  }

  // 编辑媒体项目
  handleEditItem(record) {
    console.log(record)
    this.context.router.push('/page/media/edit/' + record.id)
  }

  // 删除项目
  handleDeleteItem(record) {
    const self = this
    confirm({
      title: '确认删除这个项目么?',
      onOk() {
        return self.props.deleteItem({id: record.id})
      },
      onCancel() {
      },
    })
  }

  // 切换媒体状态
  handleSwitchChange(record, status) {
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
    this.fetchList({page: page, pageSize: pageSize})
    this.context.router.push('/page/media/overview/' + page)
  }

  render() {
    const {mediaList} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="overview media-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <Form className="list-search" layout="inline" onSubmit={this.handleSearch}>
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
              <Button type="primary" htmlType="submit">搜索</Button>
            </FormItem>
            <FormItem className="new">
              <Button type="primary">
                <Link to="/page/media/new">新建媒体</Link>
              </Button>
            </FormItem>
          </Form>
        </div>
        <div className="grid media-grid" style={{padding: '10px 20px'}}>
          <div>
            <Table rowKey="id"
                   dataSource={mediaList.list}
                   columns={this.columns}
                   pagination={{defaultCurrent: this.page, total: mediaList.totalCount, pageSize: this.pageSize}}
                   onChange={this.handleTableChange}/>
          </div>
        </div>
      </div>
    )
  }
}
MediaViewPage.contextTypes = {
  router: PropTypes.object.isRequired
}

MediaViewPage.propTypes = {
  mediaList: PropTypes.object.isRequired,

  fetchList: PropTypes.func.isRequired,
  updateForm: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  enableStatus: PropTypes.func.isRequired,
  disableStatus: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const {mediaList} = state
  return {
    mediaList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchList(params) {
      dispatch(fetchList(params))
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
)(MediaViewPage)
