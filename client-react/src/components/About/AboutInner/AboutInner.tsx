import React from 'react';
import { RouteComponentProps } from 'react-router';
import appStyles from 'components/App/App.module.scss';

type RouteProps = {
	id?: string,
};

function AboutInner(props: RouteComponentProps<RouteProps>): JSX.Element {
	return (
		<div>
			<h2 className={appStyles.title}>AboutInner Component</h2>
			<p className={appStyles.text}>ID: {props.match.params.id}</p>
		</div>
	);
}

export default AboutInner;
