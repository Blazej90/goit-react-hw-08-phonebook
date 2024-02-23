import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://65d5f0ccf6967ba8e3bd06c0.mockapi.io/contacts/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async contact => {
    const response = await axios.post(apiUrl, contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addNewContact.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    });
  },
});

export default contactsSlice.reducer;
