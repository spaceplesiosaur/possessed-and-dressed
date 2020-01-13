import React from 'react';
import ErrorPage from './404Page';
import { shallow } from 'enzyme';

it('should render with correct data', () => {
  const wrapper = shallow(<ErrorPage />)

  expect(wrapper).toMatchSnapshot()
})
