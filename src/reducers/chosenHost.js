export const chosenHostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHOOSE_HOST':
      return action.chosenHost
    case 'CLEAR_HOST':
      return {}
    default:
      return state
  }
}
