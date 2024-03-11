import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://65d5f0ccf6967ba8e3bd06c0.mockapi.io/contacts/contacts';

// Tworzenie createAsyncThunk dla fetchContacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }
);

// Tworzenie createAsyncThunk dla addNewContact
export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contact, { getState }) => {
    const { auth } = getState();
    const response = await axios.post(apiUrl, contact, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }
);

// Tworzenie createAsyncThunk dla deleteContact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { getState }) => {
    const { auth } = getState();
    await axios.delete(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
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
