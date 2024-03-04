import axios from 'axios';

export const loginUserStart = () => ({
  type: 'auth/loginUserStart',
});

export const loginUserSuccess = user => ({
  type: 'auth/loginUserSuccess',
  payload: user,
});

export const loginUserFailure = error => ({
  type: 'auth/loginUserFailure',
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
