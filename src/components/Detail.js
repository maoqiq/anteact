import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

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
      <div>
        <Breadcrumb style={{margin: '12px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
          Content
        </Content>
      </div>
    );
  }
}

// AppHeader.propTypes = propTypes;

export default AppHeader;
