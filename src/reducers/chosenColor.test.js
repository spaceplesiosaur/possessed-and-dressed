import { chosenColorReducer } from './chosenColor'

describe('chosenColorReducer', () => {
  it('should return the initial state', () => {
    expect(chosenColorReducer('', {type: undefined, chosenColor: {}})).toEqual('')
  })

  it('should return the correct state with action type CHOOSE_COLOR', () => {
    const mockChosenColor = {
        id: 34,
        name: "berry",
        hex_code: "#C40C42",
        category: 34
    }
    const action = {type: 'CHOOSE_COLOR', chosenColor: mockChosenColor}

    expect(chosenColorReducer('', action)).toEqual(mockChosenColor)
  })
})
