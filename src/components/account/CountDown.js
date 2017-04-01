import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Button} from 'antd';


class CountDown extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.onClick = this.onClick.bind(this)
    this.count = this.count.bind(this)
    this.state = {
      text: '获取验证码'
    }
  }

  onClick(e) {
    console.log('click')

    let timer = null
    let countTime = this.props.countTime
    this.count(timer, countTime)
  }

  count(timer, num) {
    timer = setTimeout(() => {
      num -= 1
      this.setState({
        text: num
      })
      if (num > 0) {
        this.count(timer, num)
      } else {
        this.setState({
          text: '获取验证码'
        })
      }
    }, 1000)
  }

  render() {
    return (
      <Button size="large" onClick={this.onClick} style={{width: '100%'}}
              disabled={typeof this.state.text === 'number'}
      >
        {this.state.text}
      </Button>
    )
  }
}

export default CountDown
