import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import {Link, IndexLink} from 'react-router';
import AppBreadcrumb from './Breadcrumb'
// const propTypes = {
//   comment: PropTypes.object.isRequired,
//   i: PropTypes.number.isRequired,
// };

class AppHeader extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.itemRender = this.itemRender.bind(this)
  }

  itemRender(route, params, routes, paths) {
    console.log(route, params, routes, paths)
    alert('123')
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

// AppHeader.propTypes = propTypes;

export default AppHeader;
