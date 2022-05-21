import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import appStyles from 'components/App/App.module.scss';
import styles from 'components/Home/Login/Login.module.scss';
import Api from 'Api/Api';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectIsLoggedInFlag, setIsLoggedInFlag } from 'redux/slices/loginSlice';
import classNames from 'classnames';

function Login(): JSX.Element {
	const [users, setUsers] = useState([] as string[]);
	const [loginUserExistsError, setLoginUserExistsError] = useState(true);
	const [emailConfirmationError, setEmailConfirmationError] = useState(true);
	const [incorrectPasswordError, setIncorrectPasswordError] = useState(true);
	const [registrationUserExistsError, setRegistrationUserExistsError] = useState(false);
	const [commonError, setCommonError] = useState(false);
	const [login, setLogin] = useState('test@test.com');
	const [isLoading, setIsLoading] = useState(true);
	const [password, setPassword] = useState('1');
	const isLoggedIn = useAppSelector(selectIsLoggedInFlag);
	const dispatch = useAppDispatch();

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

	async function sendSignUpRequest(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		resetFlags();

		try {
			const payload = {login, password};
			const response = await Api.signUpUser(payload);
			setUsers(response.data.users);
		} catch (e) {
			if (e?.response?.status === 403) {
				setRegistrationUserExistsError(true);
			} else {
				setCommonError(true);
			}
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
			dispatch(setIsLoggedInFlag(true));
		} catch (e) {
			const loginError = e?.response?.status === 404;
			const confirmationError = e?.response?.status === 403;
			const passwordError = e?.response?.status === 401;
			setLoginUserExistsError(!loginError);
			setEmailConfirmationError(!confirmationError);
			setIncorrectPasswordError(!passwordError);
		}
	}

	async function logOutUser(e: FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		localStorage.removeItem('token');
		dispatch(setIsLoggedInFlag(false));
	}

	async function sendAuthenticationRequest(token: string) {
		try {
			const response = await Api.authenticateUser(token);
			dispatch(setIsLoggedInFlag(true));
			setLogin(response.data.login);
			localStorage.setItem('token', response.data.newToken);
			Api.setAuthHeader(response.data.newToken);
		} catch (e) {
			console.log(`Authentication failed`);
		}
	}

	function resetFlags() {
		setLoginUserExistsError(true);
		setIncorrectPasswordError(true);
		setRegistrationUserExistsError(false);
		setCommonError(false);
	}

	return (
		<div>
			<h2 className={appStyles.title}>Login (Json Web Token)</h2>
			{
				!isLoading &&
				<>
					<h3 className={styles.info}>
						Login status:
						<span
							className={classNames(styles.status, {[`${styles.success}`]: isLoggedIn}, {[`${styles.warning}`]: !isLoggedIn})}
							data-testid="login-status"
						>
							logged {isLoggedIn ? 'in' : 'out'}
						</span>
					</h3>
					<form>
						{
							!isLoggedIn &&
							<>
								<div>
									<div className={styles['login-container']}>
										<div className={styles['input-container']}>
											<input
												data-testid="login-input"
												placeholder="Login"
												type="text"
												value={login}
												onChange={handleLoginChange}
											/>
											{
												registrationUserExistsError &&
												<span className={styles['validation-msg']}>
													User already exists
												</span>
											}
											{
												!loginUserExistsError &&
												<span className={styles['validation-msg']}>
													Such user doesn't exist
												</span>
											}
											{
												!emailConfirmationError &&
												<span className={styles['validation-msg']}>
													Email is not confirmed
												</span>
											}
										</div>
										<div className={styles['input-container']}>
											<input
												data-testid="password-input"
												placeholder="Password"
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
											{
												!incorrectPasswordError &&
												<span className={styles['validation-msg']}>
													Password is not correct
												</span>
											}
											{
												commonError &&
												<span className={styles['validation-msg']}>
													Error upon user sign up
												</span>
											}
										</div>
									</div>
									<div className={styles['button-container']}>
										<button
											className={classNames(appStyles.button, appStyles['button-blue'])}
											onClick={sendSignUpRequest}
										>
											Sign Up (Add user)
										</button>
										<button
											className={classNames(appStyles.button, appStyles['button-blue'])}
											data-testid="sign-in-button"
											onClick={sendSignInRequest}
										>
											Sign in
										</button>
									</div>
								</div>
								<div className={styles['users-list']}>
									<h3 className={styles['users-title']}>Test account:</h3>
									<div className={styles['users-row']}><strong>Login:&nbsp;</strong>test@test.com</div>
									<div className={styles['users-row']}><strong>Password:&nbsp;</strong>1</div>
									{
										users?.length &&
										<h3 className={styles['users-title']}>Registered users:</h3>
									}
									{users?.map((user, index) => (
										<span key={index} className={styles['users-name']} data-testid="user-list">
											{user}{index !== users.length - 1 && ', '}
										</span>
									))}
								</div>
							</>
						}
						{
							isLoggedIn &&
							<div>
								<h4 className={styles['welcome-message']} data-testid="welcome-message">
									Welcome, <strong>{login}</strong>
								</h4>
								<div className={styles['button-container']}>
									<button
										className={classNames(appStyles.button, appStyles['button-blue'])}
										data-testid="log-out-button"
										onClick={logOutUser}
									>
										Log out
									</button>
								</div>
							</div>
						}
					</form>
				</>
			}
		</div>
	);
}

export default Login;
