import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import moment from 'moment'
import randomColor from 'randomcolor'
import {Upload, Icon, Table} from 'antd';
const Dragger = Upload.Dragger;

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'


class DataChart extends Component {
  constructor(props) {
    super(props)

  }

  componentWillMount() {

  }

  render() {
    let chartData = [], chartLines = []
    const data = this.props.data.detailVOMap
    if (data && Object.keys(data).length > 0) {
      // 获取日期key
      Object.keys(data).map((value, index) => {
        const _item = {date: value, ...data[value].bizNameCountMap}
        chartData.push(_item)
      })

      // 排序
      chartData.sort((before, after) => {
        return moment(before.date).isBefore(after.date) ? -1 : 1
      })

      // 设置line
      chartLines = Object.keys(chartData[0]).filter(item => item !== 'date')
        .map((value, index) => {
          return <Line key={`chart-${index}`} type="monotone" dataKey={value}
                       stroke={randomColor({luminosity: 'dark', count: 1})}/>
        })
    }

    const percent = (value) => {
      return value + '%'
    }


    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart width={600} height={300} data={chartData}
                   margin={{top: 5, right: 40, left: 10, bottom: 5}}>
          <XAxis dataKey="date"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          {chartLines}

        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default DataChart;
