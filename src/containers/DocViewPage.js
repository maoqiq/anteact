import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, IndexLink} from 'react-router';

import {Icon, Tabs, Card, Row, Col} from 'antd';
const TabPane = Tabs.TabPane;

class DocViewPage extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="overview doc-overview">
        <div>
          <Card className="platform" title="JSSDK" bordered={false}>
            <Row>
              <Col xs={24} sm={4}>Ver 2.0.1</Col>
              <Col xs={24} sm={20}>
                · 优化数据上报<br/>
                · 缩小SDK包体积20%</Col>
            </Row>
            <Row>
              <Col xs={24} sm={4}>Ver 1.0</Col>
              <Col xs={24} sm={20}>
                · 丰富标准样式选择：横幅、插屏、开屏、信息流、浮标、banner、应用墙、自定义<br/>
                · 独创交互式广告体验，更高收益<br/>
                · 支持用户行为数据记录，用于提升广告投放准确性和稳定性
              </Col>
            </Row>
          </Card>

          <Card className="platform" title="IOS/Android SDK" bordered={false}>
            即将上线..
          </Card>

        </div>
      </div>
    );
  }
}

export default DocViewPage
