import React, {useEffect, useState} from 'react';
import appStyles from 'components/App/App.module.scss';
import styles from 'components/Confirmation/Confirmation.module.scss';
import Api from 'Api/Api';
import classNames from 'classnames';

function Confirmation(): JSX.Element {
	const [statusFlag, setStatusFlag] = useState(false);

	useEffect(() => {
		confirmUser();
	}, []);

	async function confirmUser() {
		const token = new URL(window.location.href).searchParams.get('id');

		if (!token) {
			setStatusFlag(false);
			return;
		}

		try {
			Api.setAuthHeader(token);
			await Api.authenticateUser(token);
			localStorage.setItem('token', token);
			setStatusFlag(true);
		} catch (e) {
			setStatusFlag(false);
		}
	}

	return (
		<div className={styles.Confirmation}>
			<h2 className={styles.link}>Confirmation Component</h2>
			<p className={classNames(styles['status-msg'], {[`${styles.error}`]: !statusFlag})}>
				{
					statusFlag ?
					'Your email has been confirmed successfully' :
					`Wrong token. Couldn't confirm the email. Type your email below to 
					re-send the confirmation email:`
				}
			</p>
			{
				statusFlag &&

				<a href="/" className={classNames(styles.link, appStyles.button, appStyles['button-blue'])}>
					Go to main page
				</a>
			}
		</div>
	);
}

export default Confirmation;
