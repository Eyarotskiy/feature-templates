import React, {useEffect, useState} from 'react';
import 'components/Confirmation/Confirmation.scss';
import Api from 'Api/Api';

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
		<div className="Confirmation">
			<h2 className="title">Confirmation Component</h2>
			<p className={`status-msg ${statusFlag ? 'success' : 'error'}`}>
				{
					statusFlag ?
					'Your email has been confirmed successfully' :
					`Wrong token. Couldn't confirm the email. Type your email below to 
					re-send the confirmation email:`
				}
			</p>
			{
				statusFlag &&
				<a href="/" className="link btn btn-blue">
					Go to main page
				</a>
			}
		</div>
	);
}

export default Confirmation;
