import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { getInfo } from '../../util/apiCalls.js';
import { setHosts } from '../../actions/index.js';
import { setSeasons } from '../../actions/index.js';
import { App, mapStateToProps, mapDispatchToProps } from './App';

jest.mock('../../util/apiCalls.js');

describe('App', () => {
  let wrapper;
  let mockHosts;
  let mockSeasons;
  let mockChosenHost;
  let mockChosenColor;
  let mockHexList;
  let mockArgument;

  beforeEach(() => {
    getInfo.mockImplementation(() => {
      return Promise.resolve(mockArgument)
    })

    mockArgument = ''

    mockHosts = [
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

    mockSeasons = [
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

  mockChosenHost = {
      id: 1,
      name: "Blucifer",
      picture: "https://i.imgur.com/I5MqMUV.jpg",
      season: 9
  }

  mockHexList = [
    {
        id: 34,
        name: "true red",
        hex_code: "#C20000",
        category: 34
    },
    {
        id: 41,
        name: "watermelon",
        hex_code: "#EE3F4B",
        category: 34
    },
    {
        id: 35,
        name: "saffron",
        hex_code: "#ffa807",
        category: 35
    },
    {
        id: 44,
        name: "creamsicle",
        hex_code: "#F8BA64",
        category: 35
    }
  ]

  mockChosenColor = {
        id: 41,
        name: "watermelon",
        hex_code: "#EE3F4B",
        category: 34
    }

    wrapper = shallow(<App
        hostList={mockHosts}
        seasonList={mockSeasons}
        chosenHost={mockChosenHost}
        chosenColor={mockChosenColor}
        hexList={mockHexList}
        storeHosts={jest.fn()}
        storeSeasons={jest.fn()}
      />)
  })

  it('should render App with correct data', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call supplyHosts and supply seasons when component mounts', () => {
    wrapper.instance().supplyHosts = jest.fn()
    wrapper.instance().supplySeasons = jest.fn()
    wrapper.instance().componentDidMount()

    expect(wrapper.instance().supplyHosts).toHaveBeenCalled()
    expect(wrapper.instance().supplySeasons).toHaveBeenCalled()
  })

  it('should call getInfo and storeHosts when supplyHosts is called', async () => {
    mockArgument = mockHosts
    await wrapper.instance().supplyHosts()

    expect(wrapper.instance().props.storeHosts).toHaveBeenCalledWith(mockHosts)
    expect(getInfo).toHaveBeenCalled()
  })
  it('should call getInfo and storeSeasons when supplySeasons is called', async () => {
    mockArgument = mockSeasons
    await wrapper.instance().supplySeasons()

    expect(wrapper.instance().props.storeSeasons).toHaveBeenCalledWith(mockSeasons)
    expect(getInfo).toHaveBeenCalled()
  })

  it('should determine a host/s season from the host season id', () => {
    const expected = {
        id: 9,
        name: "winter",
        colors: [
            34,
            35,
            36,
            52,
        ]
    }
    expect(wrapper.instance().determineHostSeason()).toEqual(expected)
  })

  it('should call determineHostSeason when determineMatch is run', () => {
    const spy = jest.spyOn(wrapper.instance(), 'determineHostSeason').mockImplementation(() => {
      return (
        {
            id: 9,
            name: "winter",
            colors: [
                34,
                35,
                36,
                52,
            ]
        }
      )
    })

    wrapper.instance().determineMatch()

    expect(spy).toHaveBeenCalled()

    //ANOTHER WAY
    // wrapper.instance().determineHostSeason = jest.fn().mockImplementation(() => {
    //   return (
    //       {
    //           id: 9,
    //           name: "winter",
    //           colors: [
    //               34,
    //               35,
    //               36,
    //               52,
    //           ]
    //       }
    //     )
    // })
    //
    // wrapper.instance().determineMatch()
    //
    // expect(wrapper.instance().determineHostSeason).toHaveBeenCalled()
  })

  it('should return false when the chosen color is NOT in the chosen host/s season array', () => {
    jest.spyOn(wrapper.instance(), 'determineHostSeason').mockImplementation(() => {
      return (
        {
            id: 9,
            name: "winter",
            colors: [
                34,
                35,
                36,
                52,
            ]
        }
      )
    })
    expect(wrapper.instance().determineMatch()).toEqual(false)
  })

  it('should return true when the chosen color is in the chosen host/s season array', () => {
    const mockChosenColor2 = {
        id: 35,
        name: "saffron",
        hex_code: "#ffa807",
        category: 35
    }

    wrapper = shallow(<App
        hostList={mockHosts}
        seasonList={mockSeasons}
        chosenHost={mockChosenHost}
        chosenColor={mockChosenColor2}
        hexList={mockHexList}
        storeHosts={jest.fn()}
        storeSeasons={jest.fn()}
      />)

    jest.spyOn(wrapper.instance(), 'determineHostSeason').mockImplementation(() => {
      return (
        {
            id: 9,
            name: "winter",
            colors: [
                34,
                35,
                36,
                52,
            ]
        }
      )
    })

    //OVerkill.  I should have NOT mocked out a different chosen color, and instead mocked out the result of the spy/  The function being spied on runs anyway and return sthe same thing!  Spies don't take the function out, btw.
    expect(wrapper.instance().determineMatch()).toEqual(true)
  })

  describe('mapStateToProps', () => {
    it('should return the correct data from the state', () => {
      const mockState = {
        hosts: mockHosts,
        chosenHost: mockChosenHost,
        categories: [{
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
        }],
        seasons: mockSeasons,
        allColors: mockHexList,
        chosenColor: mockChosenColor
      }

      const expected = {
        hostList: mockHosts,
        seasonList: mockSeasons,
        chosenHost: mockChosenHost,
        chosenColor: mockChosenColor,
        hexList: mockHexList
      }

      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with setHosts when storeHosts is called', () => {
      const mockDispatch = jest.fn()

      mapDispatchToProps(mockDispatch).storeHosts([{}, {}])

      expect(mockDispatch).toHaveBeenCalledWith(setHosts([{}, {}]))
    })

    it('calls dispatch with setSeasonss when storeSeasons is called', () => {
      const mockDispatch = jest.fn()

      mapDispatchToProps(mockDispatch).storeSeasons([{}, {}])

      expect(mockDispatch).toHaveBeenCalledWith(setSeasons([{}, {}]))
    })
  })
})
