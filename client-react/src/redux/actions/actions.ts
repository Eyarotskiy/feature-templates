import {actionType} from 'redux/actions/actionType';
import {UserData} from 'common/types';
import {AnyAction} from 'redux';

export function setLoginFlag (payload: boolean): AnyAction {
	return {
		type: actionType.SET_IS_LOGGED_IN,
		payload,
	}
}

export function setUsers(payload: UserData[]): AnyAction {
	return {
		type: actionType.SET_USERS,
		payload,
	}
}
