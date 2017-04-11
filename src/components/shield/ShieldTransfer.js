import React, {Component, PropTypes} from 'react';

import {Transfer} from 'antd';


class ShieldTransfer extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(keys) {
    this.props.onChange.call(this, keys)
  }

  render() {
    const {dataSource, targetKeys} = this.props
    // 从行业列表二级子类目提出到一维数组
    const data = dataSource.data
      .map((items) => {
        if (items.children && items.children.length) {
          return items.children
        }
      })
      .reduce((acc, value) => {
        const copyItem = value.map(item => Object.assign({}, item))
        return acc.concat(copyItem)
      }, [])

    return (
      <Transfer
        notFoundContent="列表为空"
        dataSource={data}
        titles={['选择行业', '已选行业']}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        targetKeys={targetKeys}
        render={item => `${item.name}`}
        searchPlaceholder="搜索"
        onChange={this.handleChange}
        rowKey={record => record.code}
      />
    )
  }
}

ShieldTransfer.PropTypes = {
  dataSource: PropTypes.object.isRequired,
  targetKeys: PropTypes.object.isRequired
}


export default ShieldTransfer
