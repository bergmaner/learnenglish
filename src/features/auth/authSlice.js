import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
});

export const { login, logout } = slice.actions;

export const selectCurrentUser = state => state.rootReducer.auth.user;

export default slice.reducer;