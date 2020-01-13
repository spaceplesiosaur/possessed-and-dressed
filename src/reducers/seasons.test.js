import { seasonsReducer } from './seasons'

describe('seasonsReducer', () => {
  it('should return the initial state when action is undefined', () => {
    expect(seasonsReducer([], {type: undefined, seasons: [{}]})).toEqual([])
  })

  it('should return the correct state when action type is SET_SEASONS', () => {
    const mockSeasons = [
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
    const action = {type: 'SET_SEASONS', seasons: mockSeasons}

    expect(seasonsReducer([], action)).toEqual(mockSeasons)
  })
})
