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
})
