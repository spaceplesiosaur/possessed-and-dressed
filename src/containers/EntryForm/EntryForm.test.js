import React from 'react';
import { shallow } from 'enzyme';
import { EntryForm } from './EntryForm';
import { Provider } from 'react-redux';

describe('EntryForm', () => {
  let wrapper;
  let mockHosts;
  let mockChosenHost

  beforeEach(() => {
    mockHosts = mockHosts = [
    {
        id: 1,
        name: "Blucifer",
        picture: "https://i.imgur.com/I5MqMUV.jpg",
        season: 9
    },
    {
        id: 2,
        name: "Shimmeree",
        picture: "https://i.imgur.com/P9srxtU.jpg",
        season: 6
    },
    {
        id: 3,
        name: "Rainbow Dash",
        picture: "https://i.imgur.com/GJthKTQ.jpg",
        season: 6
    }
  ]

  mockChosenHost = {
      id: 1,
      name: "Blucifer",
      picture: "https://i.imgur.com/I5MqMUV.jpg",
      season: 9
  }

    wrapper = shallow(<EntryForm
        hostList={mockHosts}
        host={mockChosenHost}
        chooseAHost={jest.fn()}
      />)
  })

  it('should render with the correct properites', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render with the correct properites when there is not a defined chosen user', () => {
    const wrapper = shallow(<EntryForm
        hostList={mockHosts}
        host={{}}
        chooseAHost={jest.fn()}
      />)
    expect(wrapper).toMatchSnapshot();
  })

  it('should have the correct number of host components when it renders', () => {
    const wrapper = shallow(<EntryForm
        hostList={mockHosts}
        host={{}}
        chooseAHost={jest.fn()}
      />)
    expect(wrapper.find('MiniHost')).toHaveLength(3)
  })

  it('should change the input state to equal the event value on change', () => {
    const mockEvent = {target: {name: 'hostName', value: "Blucifer" }}

    wrapper.instance().setState({hostName: ''})

    wrapper.instance().handleChange(mockEvent)

    expect(wrapper.instance().state.hostName).toEqual('Blucifer')
  })

  it('should call handleChange when the input value is changed', () => {
    const wrapper = shallow(<EntryForm
        hostList={mockHosts}
        host={{}}
        chooseAHost={jest.fn()}
      />)
    wrapper.instance().handleChange = jest.fn()
    wrapper.instance().forceUpdate()
    const mockEvent = {target: {name: 'hostName', value: "Blucifer" }}

    wrapper.find('#hostName-input').simulate('change', mockEvent)

    expect(wrapper.instance().handleChange).toHaveBeenCalledWith(mockEvent)
  })

  it('should return the chosen host/s name if the input matches a name from the hostList', () => {
    wrapper.instance().setState({hostName: "Blucifer"})

    expect(wrapper.instance().findHost()).toEqual(mockChosenHost)
  })

  it('should return an error string if the input doesn not match a name from the hostList', () => {
    wrapper.instance().setState({hostName: "Blarfingar"})

    expect(wrapper.instance().findHost()).toEqual('error')
  })

  it('should change the input class to an error state if state.error is true', () => {
    wrapper.instance().setState({inputClass: {}})
    wrapper.instance().setState({error: true})

    const expected = {input: "entryForm-hostName-inputError", text: ".entryForm-error-text"}

    wrapper.instance().handleError()
    expect(wrapper.instance().state.inputClass).toEqual(expected)
  })

  it('should not change the input class to an error state if state.error is false', () => {
    wrapper.instance().setState({inputClass: {}})
    wrapper.instance().setState({error: false})

    wrapper.instance().handleError()
    expect(wrapper.instance().state.inputClass).toEqual({})
  })

  it('should call handleClick when the input value is changed', () => {
    const wrapper = shallow(<EntryForm
        hostList={mockHosts}
        host={{}}
        chooseAHost={jest.fn()}
      />)
    wrapper.instance().handleClick = jest.fn()
    wrapper.instance().forceUpdate()
    wrapper.find('#hostName-button').simulate('click')

    expect(wrapper.instance().handleClick).toHaveBeenCalled()
  })

  it('should call findHost when handleClick runs', () => {
    wrapper.instance().findHost = jest.fn()
    wrapper.instance().handleClick()

    expect(wrapper.instance().findHost).toHaveBeenCalled()
  })

  it('should set state.error to true and call handleError if findHost returns error, even when input is not blank', async () => {
    wrapper.instance().findHost = jest.fn().mockImplementation(() => {
      return 'error'
    })
    wrapper.instance().handleError = jest.fn()
    // wrapper.instance().forceUpdate()
    wrapper.instance().setState({hostName: "Blucifer"})

    await wrapper.instance().handleClick()

    expect(wrapper.instance().state.error).toEqual(true)
    expect(wrapper.instance().handleError).toHaveBeenCalled()
  })

  it('should set state.error to true and call handleError when input is blank', async () => {
    wrapper.instance().findHost = jest.fn()
    wrapper.instance().handleError = jest.fn()
    // wrapper.instance().forceUpdate()
    wrapper.instance().setState({hostName: ""})

    await wrapper.instance().handleClick()

    expect(wrapper.instance().state.error).toEqual(true)
    expect(wrapper.instance().handleError).toHaveBeenCalled()
  })

  it('should call chooseAHost when findHost returns a correctly spelled host name', () => {
    wrapper.instance().findHost = jest.fn().mockImplementation(() => {
      return "Shimmeree"
    })
    wrapper.instance().setState({hostName: "Shimmeree"})

    wrapper.instance().handleClick()

    expect(wrapper.instance().props.chooseAHost).toHaveBeenCalledWith('Shimmeree')
  })
})
