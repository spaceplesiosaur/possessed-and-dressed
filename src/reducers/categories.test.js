import { categoriesReducer } from './categories'

describe('categoriesReducer', () => {
  it('should return the initial state', () => {
    expect(categoriesReducer([], {type: undefined, categories: [{}]})).toEqual([])
  })

  it('should return the correct state with action type SET_CATEGORIES', () => {
    const mockColorCategories = [{
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

    const action = {type: 'SET_CATEGORIES', categories: mockColorCategories}

    expect(categoriesReducer([], action)).toEqual(mockColorCategories)
  })
})
