import React from 'react';
import styles from 'components/About/About.module.scss';
import appStyles from 'components/App/App.module.scss';
import { Link, Outlet } from 'react-router-dom';

function About(): JSX.Element {
	return (
		<div className={styles.About}>
			<h2 className={appStyles.title}>About Component</h2>

			<Link
				to={`/about/about-inner/15`}
				className={appStyles['nav-link']}
				data-testid="about-inner-link"
			>
				Inner page
			</Link>

			<Outlet />
		</div>
	);
}

export default About;
