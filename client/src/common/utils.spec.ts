import ReactGA from 'react-ga';
import * as utils from './utils';

describe('utils', () => {
	describe('formatDate', () => {
		it('should return default string for incorrect date', () => {
			expect(utils.formatDate()).toBe('invalid date');
			expect(utils.formatDate(undefined)).toBe('invalid date');
		});

		it('should return formatted date', () => {
			const TEST_DATE_1 = new Date('2022-01-30T12:56:35.659Z');
			const TEST_DATE_2 = new Date('2022-01-30');

			expect(utils.formatDate(TEST_DATE_1)).toBe('30-01-2022 13:56');
			expect(utils.formatDate(TEST_DATE_2)).toBe('30-01-2022 01:00');
		});
	});

	describe('getAppUrl', () => {
		it('should return URL for localhost', () => {
			expect(utils.getAppUrl()).toBe('http://localhost');
		});

		it('should return URL for production', () => {
			const expected = 'https://shrouded-mountain-78571.herokuapp.com';

			// @ts-ignore
			process.env.NODE_ENV = 'production';

			expect(utils.getAppUrl()).toBe(expected);
		});
	});

	describe('initGoogleAnalytics', () => {
		it('should initialize Google Analytics with correct id', () => {
			ReactGA.initialize = jest.fn();

			utils.initGoogleAnalytics();

			expect(ReactGA.initialize).toHaveBeenCalledWith('UA-82338925-1');
		});
	});

	describe('trackPageView', () => {
		it('should track home page view', () => {
			ReactGA.pageview = jest.fn();

			utils.trackPageView('home');

			expect(ReactGA.pageview).toHaveBeenCalledWith('home');
		});

		it('should track about page view', () => {
			ReactGA.pageview = jest.fn();

			utils.trackPageView('about');

			expect(ReactGA.pageview).toHaveBeenCalledWith('about');
		});
	});

	describe('trackEvent', () => {
		it('should track Google Analytics event', () => {
			const expected = {
				category: 'category',
				action: 'event',
				label: 'labelName',
				value: 10,
				nonInteraction: false,
			};
			ReactGA.event = jest.fn();

			utils.trackEvent('category', 'event');

			expect(ReactGA.event).toHaveBeenCalledWith(expected);
		});
	});
});
