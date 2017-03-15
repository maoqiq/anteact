import React, {PropTypes} from 'react';

import AppHeader from './Header'
import Nav from './Nav'
import Detail from './Detail'

import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <AppHeader />
          <Layout>
            <Sider width={200} style={{background: '#fff'}}>
              <Nav />
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
              {/*<Detail />*/}
              {this.props.children}

            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
