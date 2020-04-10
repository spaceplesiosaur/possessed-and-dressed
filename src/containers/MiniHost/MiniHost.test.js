import React from 'react';
import MiniHost from './MiniHost'
import { shallow } from 'enzyme'

describe('MiniHost', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MiniHost
        picture="picture url"
        happy_pic="happy_pic_url"
        name="Blucifer"
      />)
  })

  it('should render with the correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call scareHost on onMouseEnter', () => {
    wrapper.instance().scareHost = jest.fn()
    wrapper.instance().forceUpdate()

    wrapper.find('.host-avatar-picture').simulate('mouseEnter')

    expect(wrapper.instance().scareHost).toHaveBeenCalled()
  })

  it('should call unScareHost on onMouseLeave', () => {
    wrapper.instance().unScareHost = jest.fn()
    wrapper.instance().forceUpdate()

    wrapper.find('.host-avatar-picture').simulate('mouseLeave')

    expect(wrapper.instance().unScareHost).toHaveBeenCalled()
  })

  it('should switch ishappy state true when unScareHost is called', () => {
    wrapper.setState({ishappy: false})
    wrapper.instance().unScareHost()

    expect(wrapper.instance().state.ishappy).toEqual(true)

  })

  it('should switch ishappy state true when scareHost is called', () => {
    wrapper.instance().scareHost()

    expect(wrapper.instance().state.ishappy).toEqual(false)
  })

  it('should call the correct version of the picture in the correct state', () => {
    wrapper.setState({ishappy: false})
    expect(wrapper.instance().switchPic()).toEqual("picture url")

    wrapper.setState({ishappy: true})
    expect(wrapper.instance().switchPic()).toEqual("happy_pic_url")
  })
})
