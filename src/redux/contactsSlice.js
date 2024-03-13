import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com/contacts';

const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) {
      throw new Error('No token available');
    }
    setAuthHeader(auth.token);
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contact, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) {
      throw new Error('No token available');
    }
    setAuthHeader(auth.token);
    try {
      const response = await axios.post(apiUrl, contact);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) {
      throw new Error('No token available');
    }
    setAuthHeader(auth.token);
    try {
      await axios.delete(`${apiUrl}/${contactId}`);
      return contactId;
    } catch (error) {
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        return state.filter(contact => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
