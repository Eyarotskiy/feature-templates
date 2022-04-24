import React, {useEffect} from 'react';
import 'components/Home/Analytics/Analytics.scss';
import {initGoogleAnalytics, trackEvent, trackPageView} from 'common/utils';

function Analytics(): JSX.Element {
	useEffect(() => {
		initGoogleAnalytics();
		trackPageView('yevTest');
	}, []);

	function handleClick() {
		trackEvent('testCategory', 'testEvent')
	}

	return (
		<div className="Analytics">
			<h2 className="title">Google Analytics</h2>
			<button className="button button-blue" onClick={handleClick}>
				Track Event to GA
			</button>
		</div>
	);
}

export default Analytics;
