import { combineReducers } from 'redux';
import { hostReducer } from './hosts'
import { chosenHostReducer } from './chosenHost'

export const rootReducer = combineReducers({
  hosts: hostReducer,
  chosenHost: chosenHostReducer
})
