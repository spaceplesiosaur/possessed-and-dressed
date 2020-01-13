export const hostReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_HOSTS':
      return action.hosts
    default:
      return state
  }
}
