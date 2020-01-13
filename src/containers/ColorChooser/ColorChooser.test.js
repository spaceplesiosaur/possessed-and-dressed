import React from 'react';
import { ColorChooser } from './ColorChooser';
import { shallow } from 'enzyme';

describe('ColorChooser', () => {
  let wrapper;
  let mockHues;
  let mockChosenHost;
  let mockChosenColor;

  beforeEach(() => {
    mockChosenHost = {
        id: 1,
        name: "Blucifer",
        picture: "https://i.imgur.com/I5MqMUV.jpg",
        season: 9
    }

    mockChosenColor = {
        id: 41,
        name: "watermelon",
        hex_code: "#EE3F4B",
        category: 34
    }

    mockHues = [{
        id: 45,
        name: "astros",
        hex_code: "#ff6100",
        category: 35
    },
    {
        id: 44,
        name: "burnt orange",
        hex_code: "#e5732f",
        category: 35
    },
    {
        id: 43,
        name: "tangelo",
        hex_code: "#FF9500",
        category: 35
    }]

    wrapper = shallow(<ColorChooser
      colorName={"red"}
      hues={mockHues}
      borderColor={"#F87E97"}
      chosenHost={mockChosenHost}
      chosenColor={""}
      chooseColor={jest.fn()}
      />)
  })

  it('should render with the correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the correct data when there is a chosen color', () => {
    const wrapper = shallow(<ColorChooser
      colorName={"red"}
      hues={mockHues}
      borderColor={"#F87E97"}
      chosenHost={mockChosenHost}
      chosenColor={mockChosenColor}
      />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should toggle the state to open and closed', () => {
    wrapper.instance().setState({open: false})
    wrapper.instance().toggleListDisplay()
    expect(wrapper.instance().state.open).toEqual(true)

    wrapper.instance().setState({open: true})
    wrapper.instance().toggleListDisplay()
    expect(wrapper.instance().state.open).toEqual(false)
  })

  it('should call handleMenuClick when menu button is clicked', () => {
    wrapper.instance().handleMenuClick =jest.fn()
    wrapper.instance().forceUpdate()

    wrapper.find('#menu-header').simulate('click')

    expect(wrapper.instance().handleMenuClick).toHaveBeenCalled()
  })

  it('should call handleColorClick when a color button is clicked', () => {
    wrapper.instance().handleColorClick = jest.fn()
    wrapper.instance().forceUpdate()
    console.log(wrapper.debug())
    wrapper.find('#astros').simulate('click')

    expect(wrapper.instance().handleColorClick).toHaveBeenCalled()
  })

  it('should call toggleListDisplay when handleMenuClick is run', () => {
    wrapper.instance().toggleListDisplay = jest.fn()
    wrapper.instance().forceUpdate()

    wrapper.instance().handleMenuClick()

    expect(wrapper.instance().toggleListDisplay).toHaveBeenCalled()
  })

  it('should call chooseColor when handleMenuClick is run', () => {
    const mockEvent = {target: {id: 'astros'}}
    const expected = {
        id: 45,
        name: "astros",
        hex_code: "#ff6100",
        category: 35
    }

    wrapper.instance().handleColorClick(mockEvent)

    expect(wrapper.instance().props.chooseColor).toHaveBeenCalledWith(expected)
  })

  it('should change the listDisplay state to hidden if open is toggled to false when handleMenuClick is run', async () => {
    wrapper.instance().setState({open: true})
    wrapper.instance().toggleListDisplay = await jest.fn().mockImplementation(() => {
      return wrapper.instance().setState({open: false})
    })
    wrapper.instance().forceUpdate()
    wrapper.instance().handleMenuClick()
    expect(wrapper.instance().state.listDisplay).toEqual('hidden')

  })

  // it('should change the listDisplay state to colorList-hues if open is toggled to false when handleMenuClick is run', async () => {
  //   wrapper.instance().setState({open: false})
  //   wrapper.instance().toggleListDisplay = await jest.fn().mockImplementation(() => {
  //     return wrapper.instance().setState({open: true})
  //   })
  //   wrapper.instance().forceUpdate()
  //   wrapper.instance().handleMenuClick()
  //   expect(wrapper.instance().state.listDisplay).toEqual('colorList-hues')
  //
  // })

  it('should return an array of list items the same length as the hues property', () => {
    expect(wrapper.instance().hydrateColorList()).toHaveLength(3)
  })
})
