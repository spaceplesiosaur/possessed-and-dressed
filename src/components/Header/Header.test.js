import React from 'react';
import Header from './Header'
import { shallow } from 'enzyme'

describe('Header', () => {
  it('should render with correct data', () => {
    const wrapper = shallow(
      <Header />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
