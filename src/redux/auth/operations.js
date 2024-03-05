import axios from 'axios';
import {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
} from './authActions';

export const refreshUserStart = () => ({
  type: 'auth/refreshUserStart',
});

export const refreshUserSuccess = user => ({
  type: 'auth/refreshUserSuccess',
  payload: user,
});

export const refreshUserFailure = error => ({
  type: 'auth/refreshUserFailure',
  payload: error,
});

export const loginUser = credentials => {
  return async dispatch => {
    dispatch(loginUserStart());

    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/login',
        credentials
      );

      if (response.status === 200) {
        const user = response.data.user;
        dispatch(loginUserSuccess(user));
      } else {
        dispatch(loginUserFailure('Invalid credentials'));
      }
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  };
};

export const logoutUserStart = () => ({
  type: 'auth/logoutUserStart',
});

export const logoutUserSuccess = () => ({
  type: 'auth/logoutUserSuccess',
});

export const logoutUserFailure = error => ({
  type: 'auth/logoutUserFailure',
  payload: error,
});

export { loginUserStart, loginUserSuccess, loginUserFailure };
