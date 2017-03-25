import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const BreadcrumbItem = Breadcrumb.Item
const {Header, Content, Sider} = Layout;
import {PropTypes} from 'react-router'

import AppBreadcrumb from './Breadcrumb'


class AppHeader extends Component {
  constructor(props) {
    super(props)

    this.itemRender = this.itemRender.bind(this, props.router)
    this.state = {
      breadcrumbItems: []
    }
    console.log(this.context)
  }

  componentDidMount() {
    this.setState({
      breadcrumbItems: this.itemRender()
    })

    browserHistory.listen((ev) => {
      this.setState({
        breadcrumbItems: this.itemRender()
      })
    });
  }


  // 面包屑
  itemRender(router) {
    // 配置每个item的path
    const routes = [];
    router.routes.reduce((acc, current, index) => {
      let _route = '';
      if (index > 0) {
        _route = `${acc}/${current.path}`
      }
      routes.push(_route)
      return _route
    }, '')

    // 建立 Breadcrumb Item 数组
    return router.routes.map((route, index) => {
      if (index > 1) {
        return <BreadcrumbItem key={`breadcrumb-${index}`}>
          <Link to={routes[index]}>{route.breadcrumbName}</Link>
        </BreadcrumbItem>
      }
    })
  }

  render() {
    console.log(this.state.breadcrumbItems)
    return (
      <Header className="header app-header">
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
            <Breadcrumb>
              {this.state.breadcrumbItems}
            </Breadcrumb>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default AppHeader;
