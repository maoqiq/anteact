import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Layout} from 'antd';
const {Sider} = Layout;

import AppHeader from '../components/Header'
import Nav from '../components/Nav'


class Page extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page">
        <Layout>
          <AppHeader router={this.props}/>
          <Layout>
            <Sider width={200} style={{background: '#fff'}}>
              <Nav />
            </Sider>
            <Layout style={{padding: '0 15px 15px'}}>
              {this.props.children}
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}


Page.propTypes = {
  children: PropTypes.element,
}

export default Page
