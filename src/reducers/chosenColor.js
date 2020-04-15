export const chosenColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHOOSE_COLOR':
      return action.chosenColor
    case 'CLEAR_COLOR':
      return ''
    default:
      return state
  }
}
