import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';

import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;


class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.navList = [{
      category: '媒体管理',
      items: [{
        name: '媒体列表',
        link: '/page/media/overview'
      }]
    }, {
      category: '广告位管理',
      items: [{
        name: '广告位列表',
        link: '/page/ad/overview'

      }, {
        name: '屏蔽策略管理',
        link: '/page/shield/overview'
      }]
    }, {
      category: '技术对接',
      items: [{
        name: 'SDK文档',
        link: '/page/doc/overview'
      }]
    }, {
      category: '账号管理',
      items: [{
        name: '账号信息',
        link: '/page/user/overview'
      }]
    }, {
      category: '结算数据',
      items: [{
        name: '媒体数据',
        link: '/page/chart/overview'
      }]
    }]

  }

  render() {
    const {routing} = this.props;
    const currentPath = routing.locationBeforeTransitions ? routing.locationBeforeTransitions.pathname : '';

    const items = this.navList.map((value, index) => {
      return (
        <SubMenu key={`nav-title-${index}`} title={<span><Icon type="user"/>{value.category}</span>}>
          {
            value.items.map((v, i) => (
              <Menu.Item key={v.link}>
                <Link to={v.link}>{v.name}</Link>
              </Menu.Item>
            ))
          }
        </SubMenu>
      );
    });

    return (
      <div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['nav-item-0']}
          selectedKeys={[currentPath]}
          defaultOpenKeys={['nav-title-0', 'nav-title-1', 'nav-title-2', 'nav-title-3']}
          style={{height: '100%'}}
        >
          {items}
        </Menu>
      </div>
    );
  }
}

AppHeader.propTypes = {
  routing: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {routing} = state;
  return {
    routing
  };
}

// AppHeader.propTypes = propTypes;

export default connect(
  mapStateToProps
)(AppHeader);
