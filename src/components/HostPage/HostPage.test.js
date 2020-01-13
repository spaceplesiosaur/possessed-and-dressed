import React from 'react';
import HostPage from './HostPage';
import { shallow } from 'enzyme';

describe('HostPage', () => {
  it('should render with correct data', () => {
    const mockHost = {
        id: 1,
        name: "Blucifer",
        picture: "https://i.imgur.com/I5MqMUV.jpg",
        season: 9
    }
    const wrapper = shallow(<HostPage host={mockHost}/>)

    expect(wrapper).toMatchSnapshot()
  })
})
