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
    this.data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];
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
