import React, {Component, PropTypes} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {Link, IndexLink} from 'react-router';

// const propTypes = {
//   comment: PropTypes.object.isRequired,
//   i: PropTypes.number.isRequired,
// };

class AppHeader extends Component {
  render() {
    // const {comment, i} = this.props;
    // const {user} = comment;
    // const image = getImageUrl(user.avatar_url, IMAGE_SIZES.LARGE);
    const navList = [{
      category: '媒体管理',
      items: [{
        name: '媒体列表',
        link: '/media/overview'
      }]
    }, {
      category: '广告位管理',
      items: [{
        name: '广告位列表',
        link: '/ad/overview'

      }, {
        name: '屏蔽策略管理',
        link: '/shield/overview'
      }]
    }, {
      category: '技术对接',
      items: [{
        name: 'SDK文档',
        link: '/doc/overview'
      }]
    }, {
      category: '账号管理',
      items: [{
        name: '账号信息',
        link: '/account/overview'
      }]
    }, {
      category: '结算数据',
      items: [{
        name: '媒体数据',
        link: '/data/overview'
      }]
    },]

    const items = navList.map((value, index) => {
      return (
        <SubMenu key={`nav-title-${index}`} title={<span><Icon type="user"/>{value.category}</span>}>
          {
            value.items.map((value, index) => (
              <Menu.Item key={`nav-item-${value.name}`}>
                <Link to={value.link}>{value.name}</Link>
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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{height: '100%'}}
        >
          {items}
        </Menu>
      </div>
    );
  }
}

// AppHeader.propTypes = propTypes;

export default AppHeader;
