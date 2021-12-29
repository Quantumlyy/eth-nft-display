import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
	connecting: boolean;
	triedEager: boolean;
}

const initialState: UserState = {
	connecting: false,
	triedEager: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setConnectingStatus: (state, action: PayloadAction<boolean>) => {
			state.connecting = action.payload;
		},
		setEagerAttempt: (state, action: PayloadAction<boolean>) => {
			state.triedEager = action.payload;
		}
	}
});

export const { setConnectingStatus, setEagerAttempt } = userSlice.actions;

export const selectConnectingStatus = (state: RootState) => state.user.connecting;
export const selectEagerAttempt = (state: RootState) => state.user.triedEager;

export default userSlice.reducer;
