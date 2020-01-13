import React from 'react';
import MiniHost from './MiniHost'
import { shallow } from 'enzyme'

describe('MiniHost', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MiniHost
        picture="picture url"
        name="Blucifer"
      />)
  })
  it('should render with the correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
