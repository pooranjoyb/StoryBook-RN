// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  isAuthenticated: boolean;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
