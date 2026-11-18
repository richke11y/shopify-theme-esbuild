import '../../scss/components/_item-delete.scss';

import { cartPOSTUpdate } from '../utils/shopify-cart-api';
import updateCartTemplateOrMiniCart from '../utils/update-cart-template-mini-cart.js';

export default class ItemDelete extends HTMLElement {

	constructor(){
		super();
	}

	connectedCallback() {

		this.addEventListener('click', this.clickEvent.bind(this));

	}
	
	clickEvent(e) {

		e.preventDefault();

		const clickItemDelete = e.target.matches('.item-delete') ? true : false;

		if (clickItemDelete) this.deleteCartLineItem(e.target);

	}

	async deleteCartLineItem(trigger) {

		try {

			const itemKey = trigger.dataset.cartKey;
			const line = parseInt(trigger.dataset.cartItemIndex);
			const item = this.closestCartItem(line);

			const itemKeyToDelete = { [itemKey] : 0 }

			item.classList.add('updating');

			await this.postUpdateToCart(line, itemKeyToDelete);

		} catch(error) {

			this.cartErrorHandler(line, error);

		}

	}

	async postUpdateToCart(line, itemKeyToDelete) {

		const updates = itemKeyToDelete;

		const response = await cartPOSTUpdate({updates});
		const cartObj = await response.json();

		if (response.ok) {

			await updateCartTemplateOrMiniCart(cartObj);

		} else {

			this.cartErrorHandler(line, cartObj.message);

		}

	}

	cartErrorHandler(line, message) {

		console.error(message);

		const item = this.closestCartItem(line);

		item.classList.remove('deleting');

		item.querySelector('.item-error').innerText = message;
		item.querySelector('.item-error').style.display = 'block';

	}

	closestCartItem(line) {
		return this.closest(`div[data-cart-item-index="${line}"]`);
	}

}

window.customElements.define('item-delete', ItemDelete);