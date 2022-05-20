import React from 'react';
import 'components/About/About.scss';
import {RouteComponentProps} from 'react-router';
import {Link, Route} from 'react-router-dom';
import AboutInner from 'components/About/AboutInner/AboutInner';

function About(props: RouteComponentProps): JSX.Element {
	return (
		<div className="About">
			<h2 className="title">About Component</h2>

			<Link
				to={`${props.match.path}/about-inner/15`}
				className="nav-link"
				data-testid="about-inner-link"
			>
				Inner page
			</Link>

			<Route path={`${props.match.path}/about-inner/:id`} component={AboutInner} />
		</div>
	);
}

export default About;
