import { combineReducers } from 'redux';
import { hostReducer } from './hosts';
import { chosenHostReducer } from './chosenHost';
import { categoriesReducer } from './categories';
import { allColorsReducer } from './allColors';
import { seasonsReducer } from './seasons';
import { chosenColorReducer } from './chosenColor';

export const rootReducer = combineReducers({
  hosts: hostReducer,
  chosenHost: chosenHostReducer,
  categories: categoriesReducer,
  seasons: seasonsReducer,
  allColors: allColorsReducer,
  chosenColor: chosenColorReducer
})
