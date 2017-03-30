import React, {PropTypes} from 'react';
import cookie from 'react-cookie'
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(cookie.load('esid'))
  }

  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
