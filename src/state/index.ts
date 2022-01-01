import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './reducers/assets';
import userReducer from './reducers/user';

export const store = configureStore({
	reducer: {
		user: userReducer,
		assets: assetsReducer
	},
	devTools: true
});

export const useStoreDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
