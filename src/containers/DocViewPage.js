import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import {Icon, Tabs} from 'antd';
const TabPane = Tabs.TabPane;

class DocViewPage extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="overview doc-overview">
        <Tabs defaultActiveKey="doc-tab-panel-2" className="tabs">
          <TabPane tab={<span><Icon type="apple"/>IOS版本</span>} key="doc-tab-panel-1">
            IOS开发
            <Link to="/page/doc/release">查看更新日志</Link>
          </TabPane>
          <TabPane tab={<span><Icon type="android"/>Android版本</span>} key="doc-tab-panel-2">
            Android开发
          </TabPane>
          <TabPane tab={<span><Icon type="chrome"/>JSSDK版本</span>} key="doc-tab-panel-3">
            JavaScript开发
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DocViewPage;
