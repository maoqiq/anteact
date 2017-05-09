import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Link} from 'react-router';


class NotFoundPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="not-found">
        <div>
          <h4>
            404 本页无内容
          </h4>
          <Link to="/page"> ←回到主页 </Link>
        </div>
      </div>
    )
  }
}


export default NotFoundPage;
