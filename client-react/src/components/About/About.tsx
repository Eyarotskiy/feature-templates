import React from 'react';
import styles from 'components/About/About.module.scss';
import appStyles from 'components/App/App.module.scss';
import { RouteComponentProps } from 'react-router';
import { Link, Route } from 'react-router-dom';
import AboutInner from 'components/About/AboutInner/AboutInner';

function About(props: RouteComponentProps): JSX.Element {
	return (
		<div className={styles.About}>
			<h2 className={appStyles.title}>About Component</h2>

			<Link
				to={`${props.match.path}/about-inner/15`}
				className={appStyles['nav-link']}
				data-testid="about-inner-link"
			>
				Inner page
			</Link>

			<Route path={`${props.match.path}/about-inner/:id`} component={AboutInner} />
		</div>
	);
}

export default About;
