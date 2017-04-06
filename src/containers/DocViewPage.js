import React, {Component} from 'react';

import {Card, Row, Col} from 'antd';

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
                · 拥有丰富标准样式选择：开屏、banner、自定义<br/>
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
