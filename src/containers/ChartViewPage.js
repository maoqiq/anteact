import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import {Form, Input, Table, Button, Switch, DatePicker} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

import {fetchApp, fetchPit} from '../actions/chart'

import AppChart from '../components/chart/AppChart'
import PitChart from '../components/chart/PitChart'

class AccountViewPage extends Component {
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

    this.defaultStartDate = moment().subtract(7, 'days')
    this.defaultEndDate = moment()

    this.defaultRange = [this.defaultStartDate, this.defaultEndDate]

    this.fetchData = this.fetchData.bind(this)

  }

  componentDidMount() {
    this.fetchData(this.defaultRange)
  }

  fetchData(date) {
    const path = this.context.router.routes[3].path
    const params = {
      offset: 0,
      pageSize: 20,
      startDate: date[0].format('YYYY-MM-DD'),
      endDate: date[1].format('YYYY-MM-DD'),
    }

    switch (path) {
      case 'pit':
        this.props.fetchPit(params)
        break
      case 'app':
        this.props.fetchApp(params)

    }
  }

  render() {
    const {chart} = this.props

    let dataSource = [], chartData = []


    if (chart.appData) {
      dataSource = chart.appData

      chartData = chart.actionData.map((app, app_index) => {
        console.log(app.detailVOs)
        return app.detailVOs.map((item, item_index) => {
          return {clickCount: item.clickCount, date: item.date}
        })
      })
    }

    console.log(chartData)

    return (
      <div className="overview chart-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <RangePicker onChange={this.handleDateChange} defaultValue={this.defaultRange}/>
        </div>
        <div className="grid shield-grid">
          <LineChart width={600} height={300} data={chartData[0]}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="clickCount" stroke="#8884d8"/>
          </LineChart>
        </div>

        <div className="grid chart-grid">
          <AppChart dataSource={dataSource}/>
        </div>
      </div>
    );
  }
}
AccountViewPage.contextTypes = {
  router: PropTypes.object.isRequired
};


AccountViewPage.propTypes = {
  chart: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {chart} = state;
  return {
    chart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchApp(params) {
      dispatch(fetchApp(params));
    },
    fetchPit(params) {
      dispatch(fetchPit(params));
    },

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountViewPage);
