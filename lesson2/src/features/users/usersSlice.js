import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'baby' },
  { id: '1', name: 'shark' },
  { id: '2', name: 'dududu' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (store) => store.users;

export default usersSlice.reducer;
