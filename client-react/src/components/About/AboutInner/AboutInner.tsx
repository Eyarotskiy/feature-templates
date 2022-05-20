import React from 'react';
import { RouteComponentProps } from 'react-router';
import 'components/About/AboutInner/AboutInner.scss';

type RouteProps = {
	id?: string,
};

function AboutInner(props: RouteComponentProps<RouteProps>): JSX.Element {
	return (
		<div className="AboutInner">
			<h2 className="title">AboutInner Component</h2>
			<p className="text">ID: {props.match.params.id}</p>
		</div>
	);
}

export default AboutInner;
