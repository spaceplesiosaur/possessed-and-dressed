export const chosenColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHOOSE_COLOR':
      return action.chosenColor
    default:
      return state
  }
}
