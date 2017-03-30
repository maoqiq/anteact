import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Form, Input, Table, Button, Switch, DatePicker} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

import {fetchApp} from '../actions/chart'


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


    this.columns = [
      {
        title: 'appId',
        dataIndex: 'appId',
        key: 'appId',
      }, {
        title: 'appName',
        dataIndex: 'appName',
        key: 'appName',
      }, {
        title: 'exposureCount',
        dataIndex: 'exposureCount',
        key: 'exposureCount',
      }, {
        title: 'clickCount',
        dataIndex: 'clickCount',
        key: 'clickCount',
      }, {
        title: 'clickRate',
        dataIndex: 'clickRate',
        key: 'clickRate',
      },]

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchApp()
  }

  handleDateChange(date, dateString) {
    console.log(date, dateString)

  }

  render() {
    const {chart} = this.props
    let dataSource = [], chartData = []
    if (chart.appData) {
      dataSource = chart.appData

      chartData = chart.actionData.map((app, app_index) => {
        console.log(app)
        return app.detailVOs
      })
    }

    return (
      <div className="overview chart-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <RangePicker onChange={this.handleDateChange}/>
        </div>

        <div className="grid shield-grid">
          <h1>媒体数据</h1>
          <LineChart width={600} height={300} data={this.data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8"/>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
          </LineChart>
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
            <Line type="monotone" dataKey="clickRate" stroke="#82ca9d"/>
            <Line type="monotone" dataKey="exposureCount" stroke="#523aed"/>
          </LineChart>
        </div>

        <div className="grid chart-grid">
          <Table rowKey="appId" dataSource={dataSource} columns={this.columns}/>
        </div>
      </div>
    );
  }
}


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
    fetchApp() {
      dispatch(fetchApp({offset: 0, pageSize: 20}));
    },

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountViewPage);
