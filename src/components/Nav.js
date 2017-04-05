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
      icon: 'mobile',
      items: [{
        name: '媒体列表',
        link: '/page/media/overview/1',
        tag: 'media'
      }]
    }, {
      category: '广告位管理',
      icon: 'schedule',
      items: [{
        name: '广告位列表',
        link: '/page/ad/overview/1',
        tag: 'ad'

      }, {
        name: '屏蔽策略管理',
        link: '/page/shield/overview/1',
        tag: 'shield'
      }]
    }, {
      category: '技术对接',
      icon: 'code-o',
      items: [{
        name: 'SDK文档',
        link: '/page/doc/overview',
        tag: 'doc'
      }]
    }, {
      category: '账号管理',
      icon: 'user',
      items: [{
        name: '账号信息',
        link: '/page/user/overview',
        tag: 'user'
      }]
    }, {
      category: '数据分析',
      icon: 'dot-chart',
      items: [{
        name: '媒体数据',
        link: '/page/chart-app/overview',
        tag: 'chart-app'
      }, {
        name: '广告位数据',
        link: '/page/chart-pit/overview',
        tag: 'chart-pit'
      }]
    }]
    this.state = {
      selected: ''
    }
    this.selectedNav = this.selectedNav.bind(this)
  }

  componentDidMount() {
    this.selectedNav()
  }

  selectedNav() {
    this.setState({
      selected: this.context.router.routes[2].path
    })
  }

  render() {
    const items = this.navList.map((value, index) => {
      return (
        <SubMenu key={`nav-title-${index}`} title={<span><Icon type={value.icon}/>{value.category}</span>}>
          {
            value.items.map((v, i) => (
              <Menu.Item key={v.tag}>
                <Link to={v.link}>{v.name}</Link>
              </Menu.Item>
            ))
          }
        </SubMenu>
      );
    });
    const openKeys = ['nav-title-0', 'nav-title-1', 'nav-title-2', 'nav-title-3', 'nav-title-4']
    return (
      <nav className="nav">
        <Menu
          mode="inline"
          defaultSelectedKeys={[this.state.selected]}
          selectedKeys={[this.state.selected]}
          defaultOpenKeys={openKeys}
          onClick={this.selectedNav}
        >
          {items}
        </Menu>
      </nav>
    );
  }
}
AppHeader.contextTypes = {
  router: PropTypes.object.isRequired
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
