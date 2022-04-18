import ReactGA from 'react-ga';
import {EnvironmentUrl, GOOGLE_ANALYTICS_ID} from './constants';

/**
 * Returns formatted date readable on UI, example:
 *  - input: '2022-01-30T12:56:35.659Z'
 *  - output: '30-01-2022 13:56'.
 */
export function formatDate(date?: Date): string {
	if (!date) return 'invalid date';

	date = new Date(date);

	return ('0' + date.getDate()).slice(-2) + '-' +
		('0'+(date.getMonth()+1)).slice(-2) + '-' +
		date.getFullYear() + ' ' +
		('0' + date.getHours()).slice(-2) + ':' +
		('0' + date.getMinutes()).slice(-2);
}

export function getAppUrl() {
	return process.env.NODE_ENV === 'production' ?
		EnvironmentUrl.PRODUCTION : EnvironmentUrl.LOCALHOST;
}

export function initGoogleAnalytics() {
	ReactGA.initialize(GOOGLE_ANALYTICS_ID);
}

export function trackPageView(page: string) {
	ReactGA.pageview(page);
}

export function trackEvent(categoryName: string, eventName: string) {
	ReactGA.event({
		category: categoryName,
		action: eventName,
		label: 'labelName',
		value: 10,
		nonInteraction: false,
	});
}
