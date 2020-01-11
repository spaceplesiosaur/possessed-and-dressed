export const chosenHostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHOOSE_HOST':
      return action.chosenHost
    default:
      return state
  }
}
