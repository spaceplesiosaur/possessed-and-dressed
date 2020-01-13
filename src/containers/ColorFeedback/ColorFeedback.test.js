import React from 'react';
import { ColorFeedback, mapStateToProps } from './ColorFeedback';
import { shallow } from 'enzyme';

describe('ColorFeedback', () => {
  let wrapper;
  let mockChosenColor;
  let mockChosenHost;
  let mockHostSeason

  beforeEach(() => {
    mockChosenColor = {
        id: 35,
        name: "neon strawberry",
        hex_code: "#F6003C",
        category: 34
    }

    mockChosenHost = {
        id: 1,
        name: "Blucifer",
        picture: "https://i.imgur.com/I5MqMUV.jpg",
        season: 9
    }

    mockHostSeason = {
        id: 9,
        name: "winter",
        colors: [
            34,
            35,
            36,
            52,
        ]
    }

    wrapper = shallow(<ColorFeedback
      match={true}
      chosenColor={mockChosenColor}
      chosenHost={mockChosenHost}
      season={mockHostSeason}
      />)
  })

  it('should render with correct data when match is true', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with correct data when match is false', () => {
    const wrapper = shallow(<ColorFeedback
      match={false}
      chosenColor={mockChosenColor}
      chosenHost={mockChosenHost}
      season={mockHostSeason}
      />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return the correct data from the state', () => {
      const mockState = {
        hosts: mockChosenHost,
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
        allColors: [{}, {} ,{}],
        chosenColor: mockChosenColor
      }

      const expected = {
        chosenHost: mockChosenHost,
        chosenColor: mockChosenColor
      }

      expect(mapStateToProps(mockState)).toEqual(expected)
    })
  })
})
