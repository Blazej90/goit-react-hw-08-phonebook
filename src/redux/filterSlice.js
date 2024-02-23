import { createSlice, createAction } from '@reduxjs/toolkit';

const setFilter = createAction('filter/setFilter');

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setFilter, (state, action) => {
      return action.payload;
    });
  },
});

export { setFilter };
export default filterSlice.reducer;
