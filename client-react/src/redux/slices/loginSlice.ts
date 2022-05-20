import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { LoginState } from 'common/types';

const initialState: LoginState = {
	value: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsLoggedInFlag: (state, action: PayloadAction<boolean>) => {
			state.value = action.payload;
		}
	}
});

export const {setIsLoggedInFlag} = loginSlice.actions;

export const selectIsLoggedInFlag = (state: RootState) => state.login.value;

export default loginSlice.reducer;
