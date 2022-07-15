import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role_id: number;
}

const initialState: UserState = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role_id: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  }
});

export const {  } = userSlice.actions

export default userSlice.reducer 