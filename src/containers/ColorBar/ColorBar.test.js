import React from 'react';
import { shallow } from 'enzyme';
import { ColorBar, mapStateToProps, mapDispatchToProps } from './ColorBar';
import { getInfo } from '../../util/apiCalls';
import { setCategories } from '../../actions/index.js';
import { setAllColors } from '../../actions/index.js';

jest.mock('../../util/apiCalls')

describe('ColorBar', () => {
  let wrapper;
  let mockColorCategories;
  let mockHexCodes;
  let mockArgument;

  beforeEach(() => {
    getInfo.mockImplementation(() => {
      return Promise.resolve(mockArgument)
    })

    mockColorCategories = [{
        id: 34,
        name: "red",
        colors: [
            34,
            35,
            36
        ]
    },
    {
        id: 35,
        name: "orange",
        colors: [
            45,
            44,
            43
        ]
    },
    {
        id: 36,
        name: "yellow",
        colors: [
            50,
            51,
            52
        ]
    }]

    mockHexCodes = [{
        id: 34,
        name: "berry",
        hex_code: "#C40C42",
        category: 34
    },
    {
        id: 35,
        name: "neon strawberry",
        hex_code: "#F6003C",
        category: 34
    },
    {
        id: 36,
        name: "brick",
        hex_code: "#e21a24",
        category: 34
    },
    {
        id: 43,
        name: "tangelo",
        hex_code: "#FF9500",
        category: 35
    },
    {
        id: 44,
        name: "burnt orange",
        hex_code: "#e5732f",
        category: 35
    },
    {
        id: 45,
        name: "astros",
        hex_code: "#ff6100",
        category: 35
    },
    {
        id: 51,
        name: "canary",
        hex_code: "#F8F173",
        category: 36
    },
    {
        id: 52,
        name: "light acid",
        hex_code: "#F5FCA5",
        category: 36
    },
    {
        id: 50,
        name: "sunshine",
        hex_code: "#F8DF3A",
        category: 36
    }]

    wrapper = shallow(<ColorBar
      colorCategories={mockColorCategories}
      hexCodes ={mockHexCodes}
      storeCategories={jest.fn()}
      storeAllColors={jest.fn()}
      />)
  })

  it('should render with the correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call supplyColorCategories and supplyHexCodes when component mounts', () => {
    wrapper.instance().supplyColorCategories = jest.fn()
    wrapper.instance().supplyHexCodes = jest.fn()
    wrapper.instance().componentDidMount()

    expect(wrapper.instance().supplyColorCategories).toHaveBeenCalled()
    expect(wrapper.instance().supplyHexCodes).toHaveBeenCalled()
  })

  it('should call getInfo and storeCategories when supplyColorCategories is called', async () => {
    mockArgument = mockColorCategories
    await wrapper.instance().supplyColorCategories()

    expect(wrapper.instance().props.storeCategories).toHaveBeenCalledWith(mockColorCategories)
    expect(getInfo).toHaveBeenCalled()
  })

  it('should call getInfo and storeAllColors when supplyHexCodes is called', async () => {
    mockArgument = mockHexCodes
    await wrapper.instance().supplyHexCodes()

    expect(wrapper.instance().props.storeAllColors).toHaveBeenCalledWith(mockHexCodes)
    expect(getInfo).toHaveBeenCalled()
  })

  it('should return the hex code for the menu color if given the name of the color from a list', () => {
    const colorTitles = [{red: '#F87E97'}, {orange: '#F89C51'}, {yellow: '#E7C142'}, {green: '#A7C65F'}, {blue: '#5DA1DA'}, {violet: '#5C50B6'}, {pink: '#DE92DA'}, {neutral: '#E2E2E3'}]

    const menuColor = mockColorCategories[1].name

    expect(wrapper.instance().findMenuParentColor(colorTitles, menuColor)).toEqual('#F89C51')
  })

  it('should change a list of color id/s to a list of color objects', () => {
    const orangeList = [{
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
    expect(wrapper.instance().matchAvailableHuesToList(mockColorCategories[1].colors)).toEqual(orangeList)
  })

  it('should call matchAvailableHuesToList and findMenuParentColor when displayColorBar runs', () => {
    let colorTitles = [{red: '#F87E97'}, {orange: '#F89C51'}, {yellow: '#E7C142'}, {green: '#A7C65F'}, {blue: '#5DA1DA'}, {violet: '#5C50B6'}, {pink: '#DE92DA'}, {neutral: '#E2E2E3'}]

    const orangeList = [{
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
    wrapper.instance().findMenuParentColor = jest.fn()
    wrapper.instance().matchAvailableHuesToList = jest.fn().mockImplementation(() => {
      return orangeList
    })
    wrapper.instance().displayColorBar()

    expect(wrapper.instance().findMenuParentColor).toHaveBeenCalledTimes(3)
    expect(wrapper.instance().matchAvailableHuesToList).toHaveBeenCalledTimes(3)
    // expect(wrapper.instance().findMenuParentColor).toHaveBeenCalledWith(3)
    // expect(wrapper.instance().matchAvailableHuesToList).toHaveBeenCalledWith(3)
  })

  it('should render the correct number of ColorChoosers when it renders and displayColorBar runs', () => {
    const orangeList = [{
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

    const wrapper = shallow(<ColorBar
      colorCategories={mockColorCategories}
      hexCodes={mockHexCodes}
      storeCategories={jest.fn()}
      storeAllColors={jest.fn()}
      />)

    wrapper.instance().findMenuParentColor = jest.fn().mockImplementation(() => {
      return '#F89C51'
    })
    wrapper.instance().matchAvailableHuesToList = jest.fn().mockImplementation(() => {
      return orangeList
    })
    wrapper.instance().forceUpdate()
    console.log(wrapper.debug())

    expect(wrapper.find('Connect(ColorChooser)')).toHaveLength(3)
    expect(wrapper.find({colorName: 'red'})).toHaveLength(1)
    expect(wrapper.find({colorName: 'orange'})).toHaveLength(1)
    expect(wrapper.find({colorName: 'yellow'})).toHaveLength(1)
  })

  it('should not render ColorChoosers when the list of hues has an undefined value', () => {
    const orangeList = [{
        id: 45,
        name: "astros",
        hex_code: "#ff6100",
        category: 35
    },
    undefined,
    {
        id: 43,
        name: "tangelo",
        hex_code: "#FF9500",
        category: 35
    }]

    const wrapper = shallow(<ColorBar
      colorCategories={mockColorCategories}
      hexCodes={mockHexCodes}
      storeCategories={jest.fn()}
      storeAllColors={jest.fn()}
      />)

    wrapper.instance().findMenuParentColor = jest.fn().mockImplementation(() => {
      return '#F89C51'
    })
    wrapper.instance().matchAvailableHuesToList = jest.fn().mockImplementation(() => {
      return orangeList
    })
    wrapper.instance().forceUpdate()
    console.log(wrapper.debug())

    expect(wrapper.find('Connect(ColorChooser)')).toHaveLength(0)
  })

  describe('mapStateToProps', () => {
    it('should return the correct data from the state', () => {
      const mockState = {
        hosts: [
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
        ],
        chosenHost: {
            id: 1,
            name: "Blucifer",
            picture: "https://i.imgur.com/I5MqMUV.jpg",
            season: 9
        },
        categories: mockColorCategories,
        seasons: [
        {
            id: 9,
            name: "winter",
            colors: [
                34,
                35,
                36,
                52,
            ]
        },
        {
            id: 7,
            name: "spring",
            colors: [
                36,
                37,
                39,
                41,
                44
            ]
        }
      ],
        allColors: mockHexCodes,
        chosenColor: {
            id: 50,
            name: "sunshine",
            hex_code: "#F8DF3A",
            category: 36
        }
      }

      const expected = {
        colorCategories: mockColorCategories,
        hexCodes: mockHexCodes,
        seasons: [
        {
            id: 9,
            name: "winter",
            colors: [
                34,
                35,
                36,
                52,
            ]
        },
        {
            id: 7,
            name: "spring",
            colors: [
                36,
                37,
                39,
                41,
                44
            ]
        }
      ]
      }

      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with setCategories when storeCategores is called', () => {
      const mockDispatch = jest.fn()

      mapDispatchToProps(mockDispatch).storeCategories([{}, {}])

      expect(mockDispatch).toHaveBeenCalledWith(setCategories([{}, {}]))
    })
    it('calls dispatch with setAllColors when storeAllColors is called', () => {
      const mockDispatch = jest.fn()

      mapDispatchToProps(mockDispatch).storeAllColors([{}, {}])

      expect(mockDispatch).toHaveBeenCalledWith(setAllColors([{}, {}]))
    })
  })
})
