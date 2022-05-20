import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { UserData, UsersState } from 'common/types';

const initialState: UsersState = {
	value: [],
};

export const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<UserData[]>) => {
			state.value = action.payload;
		}
	}
});

export const {setUsers} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
