import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import {Form, Input, Table, Button, Switch, DatePicker, Tabs} from 'antd';
const {MonthPicker, RangePicker} = DatePicker;
const TabPane = Tabs.TabPane;

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

import {fetchApp, fetchPit} from '../actions/chart'
import AppChart from '../components/chart/AppChart'
import PitChart from '../components/chart/PitChart'

import DataChart from '../components/chart/DataChart'

class AccountViewPage extends Component {
  constructor(props) {
    super(props)

    this.defaultStartDate = moment().subtract(7, 'days')
    this.defaultEndDate = moment()

    this.defaultRange = [this.defaultStartDate, this.defaultEndDate]

    this.fetchData = this.fetchData.bind(this)

  }

  componentDidMount() {
    this.fetchData(this.defaultRange)
  }

  fetchData(date) {
    const path = this.context.router.routes[2].path

    console.log(date)

    const params = {
      offset: 0,
      pageSize: 20,
      startDate: date[0].format('YYYY-MM-DD'),
      endDate: date[1].format('YYYY-MM-DD'),
    }

    switch (path) {
      case 'chart-pit':
        this.props.fetchPit(params)
        break
      case 'chart-app':
        this.props.fetchApp(params)
    }
  }

  render() {
    const {chart} = this.props

    let dataSource = []

    let exposeCount = [],
      clickCount = [],
      clickPercent = []

    if (chart.actionData) {
      exposeCount = chart.actionData[0]
      clickCount = chart.actionData[1]
      clickPercent = chart.actionData[2]

      dataSource = chart.appData
    }


    return (
      <div className="overview chart-overview">
        <div className="list-actions" style={{padding: '10px 20px'}}>
          <RangePicker onChange={this.fetchData} defaultValue={this.defaultRange}/>
        </div>
        <div className="chart-view">
          <Tabs defaultActiveKey="1">
            <TabPane tab="点击量" key="1">
              <DataChart data={clickCount}/>
            </TabPane>

            <TabPane tab="曝光量" key="2">
              <DataChart data={exposeCount}/>
            </TabPane>

            <TabPane tab="点击率" key="3">
              <DataChart data={clickPercent}/>
            </TabPane>
          </Tabs>
        </div>

        <div className="grid chart-grid">
          <AppChart dataSource={dataSource}/>
        </div>
      </div>
    )
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
