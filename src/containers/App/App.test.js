import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { getInfo } from '../../util/apiCalls.js';
import { setHosts } from '../../actions/index.js';
import { App } from './App';

jest.mock('../../util/apiCalls.js');

describe('App', () => {
  let wrapper;
  let mockHosts;

  beforeEach(() => {
    getInfo.mockImplementation(() => {
      return Promise.resolve(mockHosts)
    })
    
    mockHosts = [
    {
        "id": 1,
        "name": "Blucifer",
        "picture": "https://i.imgur.com/I5MqMUV.jpg",
        "season": 9
    },
    {
        "id": 2,
        "name": "Shimmeree",
        "picture": "https://i.imgur.com/P9srxtU.jpg",
        "season": 6
    },
    {
        "id": 3,
        "name": "Rainbow Dash",
        "picture": "https://i.imgur.com/GJthKTQ.jpg",
        "season": 7
    }
    ]

    wrapper = shallow(<App
        hostList={mockHosts}
        storeHosts={jest.fn()}
      />)
  })

  it('should render App with correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call supplyHosts when component mounts', () => {
    wrapper.instance().supplyHosts = jest.fn()
    wrapper.instance().componentDidMount()

    expect(wrapper.instance().supplyHosts).toHaveBeenCalled()
  })

  it('should call getInfo and storeHosts when supplyHosts is called', async () => {

    await wrapper.instance().supplyHosts()

    expect(wrapper.instance().props.storeHosts).toHaveBeenCalled()
    expect(getInfo).toHaveBeenCalled()
  })
})
