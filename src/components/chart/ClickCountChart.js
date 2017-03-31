import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Upload, Icon, Table} from 'antd';
const Dragger = Upload.Dragger;

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'


class ClickCountChart extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
  }

  render() {
    const {chart} = this.props
    console.log(chart)

    let chartData = []

    if (chart.actionData) {
      chartData = chart.actionData.map((app, app_index) => {
        return app.detailVOs.map((cate, cate_index) => {
          return {date: cate.date, clickCount: cate.clickCount}
        })
      })

      console.log(chartData)
    }

    const clickCountData = [{
      "date": "2017-03-22",
      "正点闹钟": 12,
      "头条新闻": 23,
      "腾讯新闻": 13,
    },
      {
        "date": "2017-03-23",
        "正点闹钟": 10,
        "头条新闻": 20,
        "腾讯新闻": 14,
      },
      {
        "date": "2017-03-24",
        "正点闹钟": 20,
        "头条新闻": 15.2,
        "腾讯新闻": 24,
      },
      {
        "date": "2017-03-25",
        "正点闹钟": 30,
        "头条新闻": 20,
        "腾讯新闻": 34,
      }]

    const percent = (value) => {
      return value + '%'
    }

    return (
      <LineChart width={600} height={300} data={clickCountData}
                 margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="date"/>
        <YAxis tickFormatter={percent}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip formatter={percent}/>
        <Legend />
        <Line type="monotone" dataKey="正点闹钟" stroke="#8884d8"/>
        <Line type="monotone" dataKey="头条新闻" stroke="#5584d8"/>
        <Line type="monotone" dataKey="腾讯新闻" stroke="#ff84d8"/>
      </LineChart>
    )
  }
}

ClickCountChart.propTypes = {
  chart: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {chart} = state;
  return {
    chart
  };
}

export default connect(
  mapStateToProps,
)(ClickCountChart);
