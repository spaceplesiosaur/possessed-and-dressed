export const seasonsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEASONS':
      return action.seasons;
    default:
      return state;
  }
}
