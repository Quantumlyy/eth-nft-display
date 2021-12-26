import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UserState {
	connecting: boolean;
}

const initialState: UserState = {
	connecting: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setConnectingStatus: (state, action: PayloadAction<boolean>) => {
			state.connecting = action.payload;
		},
		resetUser: (_state) => (_state = initialState)
	}
});

export const { setConnectingStatus, resetUser } = userSlice.actions;

export const selectConnectingStatus = (state: RootState) => state.user.connecting;

export default userSlice.reducer;
