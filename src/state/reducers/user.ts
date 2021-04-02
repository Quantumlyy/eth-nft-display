import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
	address: string;
}

const initialState: UserState = {
	address: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
		resetUser: (_state) => (_state = initialState)
	}
});

export const { setAddress, resetUser } = userSlice.actions;

export const selectAddress = (state: RootState) => state.user.address;

export default userSlice.reducer;
