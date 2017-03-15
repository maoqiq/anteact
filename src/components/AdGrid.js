import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Table, Icon} from 'antd';
import {Switch} from 'antd';


// Since this component is simple and static, there's no parent container for it.
class AdGrid extends Component {
  constructor(props) {
    super(props);



  }


  render() {
    return (
      <div className="grid ad-grid" style={{padding: '10px 20px'}}>
        <Table dataSource={this.dataSource} columns={this.props.columns}/>
      </div>
    );
  }

}
;

export default AdGrid;
