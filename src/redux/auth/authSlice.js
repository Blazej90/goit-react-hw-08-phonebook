// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const setAuthToken = token => {
//   if (token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (userData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://connections-api.herokuapp.com/users/login',
//         userData
//       );
//       const token = response.data.token;
//       localStorage.setItem('token', token);
//       setAuthToken(token);
//       if (response.status === 200) {
//         const user = response.data.user;
//         dispatch(loginUserSuccess(user));
//       } else {
//         dispatch(loginUserFailure('Login failed'));
//       }
//     } catch (error) {
//       if (!error.response) {
//         return rejectWithValue('No response from server');
//       }
//       const status = error.response.status;
//       if (status === 401 || status === 403) {
//         return rejectWithValue('Unauthorized access');
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://connections-api.herokuapp.com/users/signup',
//         userData
//       );
//       if (response.status === 201) {
//         const user = response.data.user;
//         const token = response.data.token;
//         localStorage.setItem('token', token);
//         setAuthToken(token);
//         dispatch(loginUserSuccess(user));
//       } else {
//         dispatch(loginUserFailure('Registration failed'));
//       }
//     } catch (error) {
//       if (!error.response) {
//         return rejectWithValue('No response from server');
//       }
//       const status = error.response.status;
//       if (status === 401 || status === 403) {
//         return rejectWithValue('Unauthorized access');
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://connections-api.herokuapp.com/users/logout'
//       );
//       if (response.status === 200) {
//         localStorage.removeItem('token');
//         setAuthToken(null);
//         dispatch(logoutUserSuccess());
//       } else {
//         dispatch(logoutUserFailure('Logout failed'));
//       }
//     } catch (error) {
//       if (!error.response) {
//         return rejectWithValue('No response from server');
//       }
//       const status = error.response.status;
//       if (status === 401 || status === 403) {
//         return rejectWithValue('Unauthorized access');
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { dispatch, getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//       return rejectWithValue('No token available');
//     }
//     try {
//       const response = await axios.get(
//         'https://connections-api.herokuapp.com/users/current'
//       );
//       if (response.status === 200) {
//         const user = response.data.user;
//         dispatch(loginUserSuccess(user));
//       } else {
//         dispatch(logoutUser());
//       }
//     } catch (error) {
//       dispatch(logoutUser());
//     }
//   }
// );

// const initialState = {
//   user: null,
//   isLoggedIn: false,
//   loading: false,
//   error: null,
//   token: localStorage.getItem('token'),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginUserStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     loginUserSuccess(state, action) {
//       state.loading = false;
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginUserFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logoutUserStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     logoutUserSuccess(state) {
//       state.loading = false;
//       state.isLoggedIn = false;
//       state.user = null;
//       state.error = null;
//     },
//     logoutUserFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(loginUser.pending, state => {
//       state.loading = true;
//     });
//     builder.addCase(loginUser.fulfilled, state => {
//       state.loading = false;
//     });
//     builder.addCase(loginUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//     builder.addCase(registerUser.pending, state => {
//       state.loading = true;
//     });
//     builder.addCase(registerUser.fulfilled, state => {
//       state.loading = false;
//     });
//     builder.addCase(registerUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//     builder.addCase(logoutUser.pending, state => {
//       state.loading = true;
//     });
//     builder.addCase(logoutUser.fulfilled, state => {
//       state.loading = false;
//     });
//     builder.addCase(logoutUser.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export const {
//   loginUserStart,
//   loginUserSuccess,
//   loginUserFailure,
//   logoutUserStart,
//   logoutUserSuccess,
//   logoutUserFailure,
// } = authSlice.actions;

// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.herokuapp.com/users';

// Ustawienie nagłówka z tokenem JWT
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, userData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      if (response.status === 200) {
        const user = response.data.user;
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(loginUserFailure('Login failed'));
      }
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('No response from server');
      }
      const status = error.response.status;
      if (status === 401 || status === 403) {
        return rejectWithValue('Unauthorized access');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, userData);
      if (response.status === 201) {
        const user = response.data.user;
        const token = response.data.token;
        localStorage.setItem('token', token);
        setAuthToken(token);
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(loginUserFailure('Registration failed'));
      }
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('No response from server');
      }
      const status = error.response.status;
      if (status === 401 || status === 403) {
        return rejectWithValue('Unauthorized access');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token available');
    }
    try {
      const response = await axios.get(`${apiUrl}/current`);
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/logout`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        return rejectWithValue('No response from server');
      }
      const status = error.response.status;
      if (status === 401 || status === 403) {
        return rejectWithValue('Unauthorized access');
      }
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginUserSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure(state, action) {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    logoutUserSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    logoutUserFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshToken.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, state => {
        state.loading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loginUserSuccess,
  loginUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
