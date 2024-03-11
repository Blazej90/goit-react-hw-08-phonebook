// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const apiUrl = 'https://65d5f0ccf6967ba8e3bd06c0.mockapi.io/contacts/contacts';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async (_, { getState }) => {
//     const { auth } = getState();
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//     });
//     return response.data;
//   }
// );

// export const addNewContact = createAsyncThunk(
//   'contacts/addNewContact',
//   async (contact, { getState }) => {
//     const { auth } = getState();
//     const response = await axios.post(apiUrl, contact, {
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//     });
//     return response.data;
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContact',
//   async (id, { getState }) => {
//     const { auth } = getState();
//     await axios.delete(`${apiUrl}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//     });
//     return id;
//   }
// );

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(fetchContacts.fulfilled, (state, action) => {
//       return action.payload;
//     });
//     builder.addCase(addNewContact.fulfilled, (state, action) => {
//       state.push(action.payload);
//     });
//     builder.addCase(deleteContact.fulfilled, (state, action) => {
//       return state.filter(contact => contact.id !== action.payload);
//     });
//   },
// });

// export default contactsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com/contacts';

// Funkcja do ustawienia nagłówka żądania z tokenem JWT
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
      return rejectWithValue('No token available');
    }
    setAuthHeader(auth.token);
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contact, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    setAuthHeader(auth.token);
    try {
      const response = await axios.post(apiUrl, contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.token) {
      return rejectWithValue('No token available');
    }
    setAuthHeader(auth.token);
    try {
      await axios.delete(`${apiUrl}/${contactId}`);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
