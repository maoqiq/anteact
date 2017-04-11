import React from 'react'
import {shallow} from 'enzyme'

import {Table} from 'antd'

import AdViewPage from './AdViewPage'


describe('<AdViewPage />', () => {
  it('should contain <Table />', () => {
    const actions = {
      fetchList: () => {
      },
      deleteItem: () => {
      },
      enableStatus: () => {
      },
      disableStatus: () => {
      },
    }

    const adList = {}


    const wrapper = shallow(<AdViewPage {...actions} adList={adList}/>)

    expect(wrapper)
  })
})
