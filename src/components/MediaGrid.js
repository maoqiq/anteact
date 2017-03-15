import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Table, Icon} from 'antd';
import {Switch} from 'antd';


// Since this component is simple and static, there's no parent container for it.
class MediaGrid extends Component {
  constructor(props) {
    super(props);
    console.log('%c Grid', 'color: #F95392', props);


  }


  render() {
    return (
      <div className="grid media-grid" style={{padding: '10px 20px'}}>
        <Table dataSource={this.props.dataSource} columns={this.props.columns}/>
      </div>
    );
  }

}
;

export default MediaGrid;
