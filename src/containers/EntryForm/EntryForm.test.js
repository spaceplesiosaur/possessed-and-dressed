import React from 'react';
import { shallow } from 'enzyme';
import { EntryForm } from './EntryForm';
import { Provider } from 'react-redux';

describe('EntryForm', () => {
  let wrapper;
  let mockHosts;

  beforeEach(() => {
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
    wrapper = shallow(<EntryForm
        hostList={mockHosts}
      />)
  })

  it('should render with the correct properites', () => {
    expect(wrapper).toMatchSnapshot();
  })

  // it('should call generateHostPictures when it renders', () => {
  //
  //   wrapper = shallow(<EntryForm
  //       hostList={mockHosts}
  //     />)
  //   wrapper.instance().generateHostPics = jest.fn()
  //   expect(wrapper.instance().generateHostPics).toHaveBeenCalled()
  // })

  // it('should generate host avatars from list', () => {
  //
  // })
})
