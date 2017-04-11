import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import {Table, Button, Switch, Modal} from 'antd'
const confirm = Modal.confirm

// import actions
import {fetchList, updateForm, deleteItem, enableStatus, disableStatus}from '../actions/media'

//import components
import MediaSearch from 'components/media/MediaSearch'


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

    return (
      <div className="overview media-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <MediaSearch onSearch={this.fetchList}/>
          <Button type="primary" className="new">
            <Link to="/page/media/new">新建媒体</Link>
          </Button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewPage)
