import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'redux/slices/loginSlice';
import usersReducer from 'redux/slices/usersSlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		users: usersReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
