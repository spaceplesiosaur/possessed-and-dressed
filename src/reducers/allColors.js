export const allColorsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_COLORS':
      return action.colors;
    default:
      return state;
  }
}
