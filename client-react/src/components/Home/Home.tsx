import React from 'react';
import appStyles from 'components/App/App.module.scss';
import CrudOperations from 'components/Home/CrudOperations/CrudOperations';
import FileUpload from 'components/Home/FileUpload/FileUpload';
import Analytics from 'components/Home/Analytics/Analytics';
import Login from 'components/Home/Login/Login';
import { useAppSelector } from 'redux/hooks';
import { selectIsLoggedInFlag } from 'redux/slices/loginSlice';

function Home(): JSX.Element {
	const isLoggedIn = useAppSelector(selectIsLoggedInFlag);

	return (
		<>
			<Login />
			{
				isLoggedIn &&
				<>
					<div className={appStyles.divider}></div>
					<CrudOperations />
					<div className={appStyles.divider}></div>
					<FileUpload />
					<div className={appStyles.divider}></div>
					<Analytics />
				</>
			}
		</>
	);
}

export default Home;
