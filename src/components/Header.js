import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import {Link, IndexLink} from 'react-router';
import AppBreadcrumb from './Breadcrumb'

class AppHeader extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.itemRender = this.itemRender.bind(this)
  }

  itemRender(route, params, routes, paths) {
    console.log(route)
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  render() {

    return (
      <Header className="header">
        <div className="logo"/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key="logout">
            <Link to="/">登出</Link>
          </Menu.Item>
          <Menu.Item key="breadcrumb">
            <Breadcrumb itemRender={this.itemRender}/>
          </Menu.Item>

        </Menu>
      </Header>
    );
  }
}

export default AppHeader;
