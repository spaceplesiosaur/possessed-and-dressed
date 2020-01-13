import { getInfo } from './apiCalls';

describe('getInfo', () => {
  let mockData;
  let mockOptions;

  beforeEach(() => {
    mockData = [
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

    mockOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 3fc50009100f8a4794408699493b41c3b84467f5',
      }
    }

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          Promise.resolve(mockData);
        }
      })
    })
  })

  it('should be passed down the correct url', () => {
    let options = mockOptions
    getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')
    expect(window.fetch).toHaveBeenCalledWith('https://color-seasons.herokuapp.com/hosts/', mockOptions)
  })

  // it('should return the correct data in the correct format', () => {
  //   let options = mockOptions
  //   expect(getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')).resolves.toEqual(mockData)
  // })
  //
  it('should throw an error when the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json: () => {
          Promise.resolve(mockData);
        }
      })
    })

    expect(getInfo('https://color-seasons.herokuapp.com/hosts/', 'hosts')).rejects.toEqual(Error('Oh no! There is a problem finding hosts'))
  })
})
