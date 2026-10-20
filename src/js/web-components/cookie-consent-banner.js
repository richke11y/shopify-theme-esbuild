import '../../scss/web-components/_cookie-consent-banner.scss';

import { renderSectionAPI } from '../utils/section-rendering-api.js';

class CookieConsentBanner extends HTMLElement {

	connectedCallback() {

		this.body = document.querySelector('body');

		this.addEventListener('click', this.clickEvent);

	}

	clickEvent(e) {

		const clickAcceptButton = e.target.matches('#btn-accept') ? true : false;
		const clickManageButton = e.target.matches('#btn-manage') ? true : false;

		if (clickAcceptButton) this.setConsentChoices();

		if (clickManageButton) this.toggleConsentOptions();

	}

	setConsentChoices() {

		const consentOptions = this.querySelector('.consent-options');

		const choices = {
			"analytics": consentOptions.querySelector('#consent-analytics').checked,
			"preferences": consentOptions.querySelector('#consent-preferences').checked,
			"marketing": consentOptions.querySelector('#consent-marketing').checked,
			"sale_of_data": consentOptions.querySelector('#consent-sale').checked
		}

		window.Shopify.customerPrivacy.setTrackingConsent(choices);

		this.removeCookieConsentBanner();

	}

	toggleConsentOptions() {

		const consentOptions = this.querySelector('.consent-options');

		consentOptions.classList.toggle('show');
	
	}

	removeCookieConsentBanner() {

		// this.remove('cookied-consent-banner');

		this.body.removeChild(this);

	}

}

window.customElements.define('cookie-consent-banner', CookieConsentBanner);

async function initCookieConsentBanner() {

	if (window.Shopify.customerPrivacy === undefined) return;

	const shouldShowBanner = window.Shopify.customerPrivacy.shouldShowBanner();
	const currentConsent = window.Shopify.customerPrivacy.currentVisitorConsent();

	// Iterates over Current Visitor Consent object.
	// If any or all of the keys are Null or empty string, user consent is required, return true
	// Otherwise Visitor Consent is not needed, return false
	const checkIfVisitorConsentNeeded = (obj) => {

		for (let key in obj) {

			if (obj[key] === '' || obj[key] === null) return true;

		}

		return false;

	}

	if (shouldShowBanner && checkIfVisitorConsentNeeded(currentConsent)) {

		try {

			const html = await renderSectionAPI('cookie-consent-banner', '/');

			renderNewHTML(html);

		} catch(error) {

			errorHandler(error);

		}

	}

}

function renderNewHTML(html) {

	if (html === null) errorHandler(error);

	const body = document.querySelector('body');
	const template = document.createElement('template');

	template.innerHTML = html.innerHTML

	const clone = template.content.cloneNode(true);

	body.append(clone);

}

function errorHandler(error) {

	// throw new Error('HTML not found in the response');
	return console.error(error);

}

function loadConsentTracking() {

	window.Shopify.loadFeatures(
		[
		  {
			name: 'consent-tracking-api',
			version: '0.1',
		  },
		],
		error => {

			if (error) {
				// Rescue error
				console.error(error);
			}

			// If error is false, the API has loaded and ready to use!
			initCookieConsentBanner();

		},
	);

}

window.addEventListener('load', loadConsentTracking);