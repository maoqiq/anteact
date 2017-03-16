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
  render() {
    // const {comment, i} = this.props;
    // const {user} = comment;
    // const image = getImageUrl(user.avatar_url, IMAGE_SIZES.LARGE);

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
            <AppBreadcrumb />
          </Menu.Item>

        </Menu>
      </Header>
    );
  }
}

// AppHeader.propTypes = propTypes;

export default AppHeader;
