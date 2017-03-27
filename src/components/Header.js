import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const BreadcrumbItem = Breadcrumb.Item
const {Header, Content, Sider} = Layout;

class AppHeader extends Component {
  constructor(props) {
    super(props)

    this.itemRender = this.itemRender.bind(this)
    this.state = {
      breadcrumbItems: []
    }
  }

  componentDidMount() {
    this.itemRender(this.props.router.routes)

    browserHistory.listen((ev) => {
      this.itemRender(this.context.router.routes)
    });
  }


  // 面包屑
  itemRender(routes) {
    // 配置每个item的path
    const _paths = [];
    routes.reduce((acc, current, index) => {
      let _route = '';
      if (index > 0) {
        _route = `${acc}/${current.path}`
      }
      _paths.push(_route)
      return _route
    }, '')

    // 建立 Breadcrumb Item 数组
    const _breadcrumbItems = routes.map((route, index) => {
      if (index > 1) {
        return <BreadcrumbItem key={`breadcrumb-${index}`}>
          <Link to={_paths[index]}>{route.breadcrumbName}</Link>
        </BreadcrumbItem>
      }
    })
    this.setState({
      breadcrumbItems: _breadcrumbItems
    })
  }

  render() {
    return (
      <Header className="header app-header">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{lineHeight: '64px'}}
        >
          <Menu.Item key="logout" className="logo">
            <Link to="/">来购</Link>
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

AppHeader.contextTypes = {
  router: PropTypes.object.isRequired
};


export default AppHeader;
