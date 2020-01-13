import { chosenHostReducer } from './chosenHost'

describe('chosenHostReducer', () => {
  it('should return the initial state', () => {
    expect(chosenHostReducer({}, {type: undefined, chosenHost: {}})).toEqual({})
  })

  it('should return the correct state with action type CHOOSE_HOST', () => {
    const mockChosenHost = {
          id: 1,
          name: "Blucifer",
          picture: "https://i.imgur.com/I5MqMUV.jpg",
          season: 9
      }
    const action = {type: 'CHOOSE_HOST', chosenHost: mockChosenHost}

    expect(chosenHostReducer({}, action)).toEqual(mockChosenHost)
  })
})
