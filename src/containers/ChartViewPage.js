import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import moment from 'moment'
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

import {DatePicker, Tabs} from 'antd'
const {MonthPicker, RangePicker} = DatePicker
const TabPane = Tabs.TabPane


import {fetchApp, fetchPit} from '../actions/chart'
import AppTable from '../components/chart/AppTable'
import PitTable from '../components/chart/PitTable'


import DataChart from '../components/chart/DataChart'


class AccountViewPage extends Component {
  constructor(props) {
    super(props)

    this.defaultStartDate = moment().subtract(7, 'days')
    this.defaultEndDate = moment()

    this.path = ''
    this.state = {
      dateRange: [this.defaultStartDate, this.defaultEndDate]
    }

    this.fetchData = this.fetchData.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)

  }

  componentDidMount() {
    this.path = this.context.router.routes[2].path
    this.fetchData(this.state.dateRange)

    browserHistory.listen((route) => {
      this.path = this.context.router.routes[2].path

      this.fetchData(this.state.dateRange)
    })
  }

  fetchData(date) {
    const params = {
      offset: 0,
      pageSize: 20,
      startDate: date[0].format('YYYY-MM-DD'),
      endDate: date[1].format('YYYY-MM-DD'),
    }

    switch (this.path) {
      case 'chart-pit':
        this.props.fetchPit(params)
        break
      case 'chart-app':
        this.props.fetchApp(params)
        break
      default:
        break
    }
  }

  handleChangeDate(date) {
    this.setState({
      dateRange: [date[0], date[1]]
    })
    this.fetchData(this.state.dateRange)
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
          <RangePicker onChange={this.handleChangeDate} defaultValue={this.state.dateRange}/>
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
          {this.path === 'chart-app' &&
          <AppTable dataSource={dataSource}/>
          }
          {this.path === 'chart-pit' &&
          <PitTable dataSource={dataSource}/>
          }
        </div>
      </div>
    )
  }
}
AccountViewPage.contextTypes = {
  router: PropTypes.object.isRequired
}


AccountViewPage.propTypes = {
  chart: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const {chart} = state
  return {
    chart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchApp(params) {
      dispatch(fetchApp(params))
    },
    fetchPit(params) {
      dispatch(fetchPit(params))
    },

  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountViewPage)
