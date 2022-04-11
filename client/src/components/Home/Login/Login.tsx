import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import 'components/Home/Login/Login.scss';
import Api from 'Api/Api';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginFlag} from 'redux/actions/actions';
import {ReduxState} from 'common/types';

function Login(): JSX.Element {
	const [users, setUsers] = useState([] as string[]);
	const [loginExistsFlag, setLoginExistsFlag] = useState(true);
	const [confirmationFlag, setConfirmationFlag] = useState(true);
	const [passwordMatchFlag, setPasswordMatchFlag] = useState(true);
	const [registrationExistsFlag, setRegistrationExistsFlag] = useState(false);
	const [login, setLogin] = useState('test@test.com');
	const [isLoading, setIsLoading] = useState(true);
	const [password, setPassword] = useState('1');
	const isLoggedIn = useSelector((state: ReduxState) => state.loginReducer.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		async function loadData() {
			const storedToken = localStorage.getItem('token');
			const response = await Api.getUsers();
			setUsers(response.data.users);

			if (storedToken) await sendAuthenticationRequest(storedToken);
			setIsLoading(false);
		}

		loadData();
		// eslint-disable-next-line
	}, []);

	function handleLoginChange(e: ChangeEvent<HTMLInputElement>) {
		setLogin(e.target.value);
		resetFlags();
	}

	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	async function sendSignUpRequest(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		resetFlags();

		try {
			const payload = {login, password};
			const response = await Api.signUpUser(payload);
			setUsers(response.data.users);
		} catch (e) {
			const userExists = e?.response?.status === 403;
			setRegistrationExistsFlag(userExists);
		}
	}

	async function sendSignInRequest(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		resetFlags();
		
		try {
			const payload = {login, password};
			const response = await Api.signInUser(payload);

			Api.setAuthHeader(response.data.token);
			localStorage.setItem('token', response.data.token);
			dispatch(setLoginFlag(true));
		} catch (e) {
			const loginError = e?.response?.status === 404;
			const confirmationError = e?.response?.status === 403;
			const passwordError = e?.response?.status === 401;
			setLoginExistsFlag(!loginError);
			setConfirmationFlag(!confirmationError);
			setPasswordMatchFlag(!passwordError);
		}
	}

	async function logOutUser(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		localStorage.removeItem('token');
		dispatch(setLoginFlag(false));
	}

	async function sendAuthenticationRequest(token: string) {
		try {
			const response = await Api.authenticateUser(token);
			dispatch(setLoginFlag(true));
			setLogin(response.data.login);
			localStorage.setItem('token', response.data.newToken);
			Api.setAuthHeader(response.data.newToken);
		} catch (e) {
			console.log(`Authentication failed`);
		}
	}

	function resetFlags() {
		setLoginExistsFlag(true);
		setPasswordMatchFlag(true);
		setRegistrationExistsFlag(false);
	}

	return (
		<div className="Login">
			<h2 className="title">Login (Json Web Token)</h2>
			{
				!isLoading &&
				<>
					<h3 className="info">
						Login status:
						<span
							className={isLoggedIn ? "status success" : "status warning"}
							data-testid="login-status">
							logged {isLoggedIn ? 'in' : 'out'}
						</span>
					</h3>
					<form className="form">
						{
							!isLoggedIn &&
							<div>
								<div className="login-container">
									<div className="input-container">
										<input
											data-testid="login-input"
											placeholder="Login"
											type="text"
											value={login}
											onChange={handleLoginChange}/>
										{
											registrationExistsFlag &&
											<span className="validation-msg">
												User already exists
											</span>
										}
										{
											!loginExistsFlag &&
											<span className="validation-msg">
												Such user doesn't exist
											</span>
										}
										{
											!confirmationFlag &&
											<span className="validation-msg">
												Email is not confirmed
											</span>
										}
									</div>
									<div className="input-container">
										<input
											data-testid="password-input"
											placeholder="Password"
											type="password"
											value={password}
											onChange={handlePasswordChange}/>
										{
											!passwordMatchFlag &&
											<span className="validation-msg">
												Password is not correct
											</span>
										}
									</div>
								</div>
								<div className="btn-container">
									<button className="btn btn-blue" onClick={sendSignUpRequest}>
										Sign Up (Add user)
									</button>
									<button
										className="btn btn-blue"
										data-testid="sign-in-button"
										onClick={sendSignInRequest}>
										Sign in
									</button>
								</div>
							</div>
						}
						{
							isLoggedIn &&
							<div>
								<h4 className="welcome-message" data-testid="welcome-message">
									Welcome, <strong>{login}</strong>
								</h4>
								<div className="btn-container">
									<button
										className="btn btn-blue"
										data-testid="log-out-button"
										onClick={logOutUser}>
										Log out
									</button>
								</div>
							</div>
						}
					</form>
					{
						!isLoggedIn &&
						<div className="users-list">
							<h3 className="users-title">Test account:</h3>
							<div className="users-row">
								<strong>Login: </strong> test@test.com
							</div>
							<div className="users-row"><strong>Password: </strong> 1</div>
							{
								users?.length &&
								<h3 className="users-title">Registered users:</h3>
							}
							{users?.map((user, index) => (
								<span
									key={index}
									className="users-name"
									data-testid="user-list">
									{user}{index !== users.length - 1 && ', '}
								</span>
							))}
						</div>
					}
				</>
			}
		</div>
	);
}

export default Login;
