import { combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';
import authReducer from './auth/authSlice';

//miejsce wszystkich reduktorów//
const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  auth: authReducer,
});

export default rootReducer;
