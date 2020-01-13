import { hostReducer } from './hosts'

describe('hostReducer', () => {
  it('should return the initial state', () => {
    expect(hostReducer([], {type: undefined, hosts: []})).toEqual([])
  })

  it('should return the correct state with action type SET_HOSTS', () => {
    const mockHosts = [
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
    const action = {type: 'SET_HOSTS', hosts: mockHosts}

    expect(hostReducer([], action)).toEqual(mockHosts)
  })
})
