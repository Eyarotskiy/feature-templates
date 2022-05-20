import React from 'react';
import 'components/Home/Home.scss';
import CrudOperations from 'components/Home/CrudOperations/CrudOperations';
import FileUpload from 'components/Home/FileUpload/FileUpload';
import Analytics from 'components/Home/Analytics/Analytics';
import Login from 'components/Home/Login/Login';
import { useAppSelector } from 'redux/hooks';
import { selectIsLoggedInFlag } from 'redux/slices/loginSlice';

function Home(): JSX.Element {
	const isLoggedIn = useAppSelector(selectIsLoggedInFlag);

	return (
		<div className="Home">
			<Login />
			{
				isLoggedIn &&
				<>
					<div className="divider"></div>
					<CrudOperations />
					<div className="divider"></div>
					<FileUpload />
					<div className="divider"></div>
					<Analytics />
				</>
			}
		</div>
	);
}

export default Home;
