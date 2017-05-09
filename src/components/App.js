import React from 'react';
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

import {fetchInfo} from '../actions/user'


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchInfo()
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}


App.propTypes = {
  children: PropTypes.element,
  userInfo: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {userInfo} = state
  return {
    userInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInfo() {
      dispatch(fetchInfo({}))
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

