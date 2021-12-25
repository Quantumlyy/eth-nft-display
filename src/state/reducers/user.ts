import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
	address: string;
	chain: number;
	connecting: boolean;
}

const initialState: UserState = {
	address: '',
	chain: 1,
	connecting: false
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
		setConnectingStatus: (state, action: PayloadAction<boolean>) => {
			state.connecting = action.payload;
		},
		resetUser: (_state) => (_state = initialState)
	}
});

export const { setAddress, setChain, setConnectingStatus, resetUser } = userSlice.actions;

export const selectAddress = (state: RootState) => state.user.address;
export const selectChainId = (state: RootState) => state.user.chain;
export const selectConnectingStatus = (state: RootState) => state.user.connecting;

export default userSlice.reducer;
