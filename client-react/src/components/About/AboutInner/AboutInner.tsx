import React from 'react';
import appStyles from 'components/App/App.module.scss';
import { useParams } from 'react-router-dom';

function AboutInner(): JSX.Element {
	const params = useParams();

	return (
		<div>
			<h2 className={appStyles.title}>AboutInner Component</h2>
			<p className={appStyles.text}>ID: {params.id}</p>
		</div>
	);
}

export default AboutInner;
