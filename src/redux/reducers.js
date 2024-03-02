import { combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';

// Miejsce dla wszystkich reduktorów //
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export default rootReducer;
