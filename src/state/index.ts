import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/user';

export const reducers = combineReducers({
	user: userReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

export type RootState = ReturnType<typeof store.getState>;
