import {AnyAction, combineReducers} from 'redux';
import {actionType} from 'redux/actions/actionType';
import {LoginReducer, UserReducer} from 'common/types';

const initialLoginData: LoginReducer = {
	isLoggedIn: false,
};

const initialUsers: UserReducer = {
	users: [],
};

function loginReducer(state = initialLoginData, action: AnyAction) {
	switch (action.type) {
		case actionType.SET_IS_LOGGED_IN:
			return {...state, isLoggedIn: action.payload};
		default:
			return state;
	}
}

function userReducer(state = initialUsers, action: AnyAction) {
	switch (action.type) {
		case actionType.SET_USERS:
			return {...state, users: action.payload};
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	loginReducer,
	userReducer,
});

export default rootReducer;
