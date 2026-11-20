import { renderSectionAPI } from '../../utils/section-rendering-api.js';

import '../../../scss/sections/product/product-recommends.scss';

export default class ProductRecommends extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.productRecommends = this.querySelector('.product-recommends');
		this.sectionId = this.productRecommends.dataset.sectionId;
		this.productId = this.productRecommends.dataset.productId;
		this.returnLimit = this.productRecommends.dataset.returnLimit;

		this.apiPath = `/recommendations/products?product_id=${this.productId}&limit=${this.returnLimit}&intent=related`;

		this.useRecommendAPI = this.productRecommends.dataset.recommendApi === 'true' ? true : false;

		if (this.useRecommendAPI) this.callRenderSectionAPI();

	}

	async callRenderSectionAPI() {

		try {

			const html = await renderSectionAPI(this.sectionId, this.apiPath);

			if (html !== null) this.renderRecommendsHTML(html);

		} catch(error) {

			this.errorHandler(error);

		} finally {}

	}

	renderRecommendsHTML(html) {

		if (this.countReturnedProducts(html) < 1) return;

		const sectionStylesheet = html.querySelector('[data-section-stylesheet]')
		// const upsellProducts = html.querySelector('.upsell-products'); // Use correct selector

		if (sectionStylesheet) this.appendChild(sectionStylesheet);

		if (upsellProducts) {

			// this.upsellProducts.replaceWith(upsellProducts); // Use correct selector

			this.productRecommends.style.display = 'block';

		}

	}

	countReturnedProducts(html) {

		const items = html.querySelectorAll('product-card');

		return items.length;

	}

	errorHandler(error) {

		return console.error('Failed to render Product Recommendations:', error);

	}

}

window.customElements.define('product-recommends', ProductRecommends);