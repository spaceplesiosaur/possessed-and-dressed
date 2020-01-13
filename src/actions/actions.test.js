import * as actions from '../actions';

describe('actions', () => {
  it('should have a type SET_HOSTS', () => {
    const hosts = [{}, {} ,{}]

    const expected = {type: 'SET_HOSTS', hosts: hosts}

    expect(actions.setHosts(hosts)).toEqual(expected)
  })

  it('should have a type CHOOSE_HOST', () => {
    const host = {}

    const expected = {type: 'CHOOSE_HOST', chosenHost: host}

    expect(actions.chooseHost(host)).toEqual(expected)
  })

  it('should have a type SET_CATEGORIES', () => {
    const categories = [{}, {}, {}]

    const expected = {type: 'SET_CATEGORIES', categories: categories}

    expect(actions.setCategories(categories)).toEqual(expected)
  })

  it('should have a type SET_ALL_COLORS', () => {
    const colors = [{}, {}, {}]

    const expected = {type: 'SET_ALL_COLORS', colors: colors}

    expect(actions.setAllColors(colors)).toEqual(expected)
  })

  it('should have a type SET_SEASONS', () => {
    const seasons = [{}, {}, {}]

    const expected = {type: 'SET_SEASONS', seasons: seasons}

    expect(actions.setSeasons(seasons)).toEqual(expected)
  })

  it('should have a type CHOOSE_COLOR', () => {
    const chosenColor = {}

    const expected = {type: 'CHOOSE_COLOR', chosenColor: chosenColor}

    expect(actions.chooseColor(chosenColor)).toEqual(expected)
  })
})
