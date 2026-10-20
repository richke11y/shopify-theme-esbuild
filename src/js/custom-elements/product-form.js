import { getProductJson, getVariantFromOptionArray } from '@shopify/theme-product';

import formatThePrice from '../utils/format-the-price.js';
import { cartPOSTAdd, cartGETState } from '../utils/shopify-cart-api.js';
// import submitProductForm from '../utils/submit-product-form.js';

export default class ProductForm extends HTMLElement {

	constructor() {
		super();

		this.productJson = '';
	}

	connectedCallback() {

		this.formElement = this.querySelector('form');
		this.productHandle = this.formElement.dataset.productHandle;

		if (this.formElement) this.initProductForm();

	}

	async initProductForm() {

		try {

			this.productJson = await getProductJson(this.productHandle);

			this.formElement.addEventListener('change', this.onFormChange.bind(this));
			this.formElement.addEventListener('submit', this.onFormSubmit.bind(this));

		} catch(error) {

			this.errorHandler(error);

		}

	}

	onFormChange() {}

	async onFormSubmit(e) {

		try {

			const formData = new FormData(this.formElement);
			const response = await cartPOSTAdd(formData, null);

			if (response.ok) {

				this.updateMiniCartAndFormUI();

			} else {

				this.errorHandler(response.error);

			}

		} catch(error) {

			this.errorHandler(error);

		}

	}

	async updateMiniCartAndFormUI() {

		try {

			const cartObj = await cartGETState();

			// Update mini cart and form buttons etc.
			// Provide visual feedback that Add to Cart was successful.

		} catch(error) {

			this.errorHandler(error);

		}

	}

	errorHandler(error) {

		// This needs to be developed further to make it more helpful.

		throw error

	}

}

window.customElements.define('product-form', ProductForm);