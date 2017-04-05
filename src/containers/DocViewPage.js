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
              <Col xs={24} sm={2}>简介</Col>
              <Col xs={24} sm={22}>
                · 拥有丰富标准样式选择：横幅、插屏、开屏、信息流、浮标、banner、应用墙、自定义等<br/>
                · 独创交互式广告体验，高效高收益<br/>
                · 支持用户行为数据记录，用于提升广告投放准确性和稳定性<br/>
                · 更轻量的JSSDK，更方便的用户配置，更快捷的体验<br/>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={2}>说明文档</Col>
              <Col xs={24} sm={22}>
                <a href="http://cdn.adbaitai.com/JSSDK/instruction.html" target="blank">点此跳转查看说明文档</a>
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
