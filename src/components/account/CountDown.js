import React, {Component} from 'react';

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
    let timer = null
    let countTime = this.props.countTime || 60
    this.count(timer, countTime)
    this.props.sendCode.call(this, e)
  }

  count(timer, num) {
    timer = setTimeout(() => {
      this.setState({text: num -= 1})
      num > 0 ? this.count(timer, num) : this.setState({text: '获取验证码'})
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
