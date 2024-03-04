import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Funkcja asynchroniczna do logowania użytkownika
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        userData
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (response.status === 200) {
        const user = response.data.user;
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(loginUserFailure('Login failed'));
      }
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  }
);

// Funkcja asynchroniczna do rejestracji użytkownika
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        userData
      );
      if (response.status === 201) {
        const user = response.data.user;
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(loginUserFailure('Registration failed'));
      }
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  }
);

// Funkcja asynchroniczna do wylogowywania użytkownika
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Dodanie tokena do nagłówka
          },
        }
      );
      if (response.status === 200) {
        dispatch(logoutUserSuccess());
      } else {
        dispatch(logoutUserFailure('Logout failed'));
      }
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  }
);

// Funkcja asynchroniczna do odświeżania tokenu JWT
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Pomyślne odświeżenie tokenu
      if (response.status === 200) {
        const user = response.data.user;
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      dispatch(logoutUser());
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess(state) {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    logoutUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(logoutUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
