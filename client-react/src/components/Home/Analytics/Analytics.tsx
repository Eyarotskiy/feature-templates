import React, {useEffect} from 'react';
import styles from 'components/Home/Analytics/Analytics.module.scss';
import appStyles from 'components/App/App.module.scss';
import { initGoogleAnalytics, trackEvent, trackPageView } from 'common/utils';
import classNames from 'classnames';

function Analytics(): JSX.Element {
	useEffect(() => {
		initGoogleAnalytics();
		trackPageView('yevTest');
	}, []);

	function handleClick() {
		trackEvent('testCategory', 'testEvent')
	}

	return (
		<div className={styles.Analytics}>
			<h2 className={appStyles.title}>Google Analytics</h2>
			<button className={classNames(appStyles.button, appStyles['button-blue'])} onClick={handleClick}>
				Track Event to GA
			</button>
		</div>
	);
}

export default Analytics;
