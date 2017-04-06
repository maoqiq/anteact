import React, {Component, PropTypes} from 'react'

import moment from 'moment'
import randomColor from 'randomcolor'

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'


class DataChart extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    let chartData = [], chartLines = []
    const {data, isPercent} = this.props
    if (data && data.detailVOMap && Object.keys(data.detailVOMap).length > 0) {
      // 获取日期key
      const chart = data.detailVOMap
      Object.keys(chart).map((value, index) => {
        const _item = {date: value, ...chart[value].bizNameCountMap}
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
      <div>
        {chartData.length <= 0 &&
        <div className="no-data">无数据</div>
        }
        {chartData.length > 0 &&
        <ResponsiveContainer width="100%" height={500}>
          <LineChart width={600} height={300} data={chartData}
                     margin={{top: 5, right: 40, left: 10, bottom: 5}}>
            <XAxis dataKey="date"/>

            {isPercent && <YAxis tickFormatter={percent}/>}
            {!isPercent && <YAxis/>}

            <CartesianGrid strokeDasharray="3 3"/>
            {isPercent && <Tooltip formatter={percent}/>}
            {!isPercent && <Tooltip/>}
            <Legend />
            {chartLines}
          </LineChart>
        </ResponsiveContainer>
        }
      </div>
    )
  }
}

export default DataChart
