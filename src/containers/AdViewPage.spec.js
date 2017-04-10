import React from 'react';
import {shallow} from 'enzyme';

import {Table} from 'antd'

import AdViewPage from './AdViewPage';


describe('<AdViewPage />', () => {
  it('should contain <Table />', () => {
    const actions = {
      adList: {},
      fetchList: () => {
      },
      deleteItem: () => {
      },
      enableStatus: () => {
      },
      disableStatus: () => {
      },
    };

    const wrapper = shallow(<AdViewPage {...actions}/>);

    expect(wrapper.find(Table).length).toEqual(1);
  });
});
