import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// TODO: store chain ID
interface UserState {
	address: string;
	chain: number;
}

const initialState: UserState = {
	address: '',
	chain: 1
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
		setChain: (state, action: PayloadAction<number>) => {
			state.chain = action.payload;
		},
		resetUser: (_state) => (_state = initialState)
	}
});

export const { setAddress, setChain, resetUser } = userSlice.actions;

export const selectAddress = (state: RootState) => state.user.address;

export default userSlice.reducer;
