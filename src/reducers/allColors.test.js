import { allColorsReducer } from './allColors'

describe('allColorsReducer', () => {
  it('should return the initial state', () => {
    expect(allColorsReducer([], {type: undefined, colors: {}})).toEqual([])
  })

  it('should return the correct state with action type SET_ALL_COLORS', () => {
    const mockColors = [{
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
    }]
    const action = {type: 'SET_ALL_COLORS', colors: mockColors}

    expect(allColorsReducer([], action)).toEqual(mockColors)
  })
})
