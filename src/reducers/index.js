import { combineReducers } from 'redux';
import { hostReducer } from './hosts'

export const rootReducer = combineReducers({
  hosts: hostReducer
})
