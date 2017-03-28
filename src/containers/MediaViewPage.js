import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {Form, Input, Table, Button} from 'antd';
const FormItem = Form.Item;

import {fetchList}from '../actions/media';

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
        key: 'actions',
        render: (text, record, index) => (
          <span>
          <Button size="small" onClick={this.handleEditMediaItem.bind(this, record)}>编辑</Button>
          <Button size="small">删除</Button>
        </span>
        )
      },];

    this.fetchMediaList = this.fetchMediaList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEditMediaItem = this.handleEditMediaItem.bind(this);
  }

  componentDidMount() {
    this.fetchMediaList();
  }

  fetchMediaList(params) {
    params = Object.assign({}, {
      pageSize: 20,
      page: 1
    }, params)
    this.props.fetchMediaList(params)
  }

  // 编辑媒体项目
  handleEditMediaItem(record) {
    console.log(record)
    // this.context.router.push('/page/media/edit/' + record.id)

  }

  handleSearch(e) {
    e.preventDefault();
    const formValue = this.props.form.getFieldsValue()
    this.fetchMediaList(formValue)
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
              {getFieldDecorator('appKey', {})(
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
          <Table rowKey="mediaList" dataSource={mediaList.data.list} columns={this.columns}/>
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
    editMediaItem(){

    }
  }
}

MediaViewPage = Form.create()(MediaViewPage)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewPage);
