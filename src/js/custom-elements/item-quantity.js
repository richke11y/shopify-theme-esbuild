import '../../scss/components/_item-quantity.scss';

import { cartPOSTChange, cartPOSTUpdate } from '../utils/shopify-cart-api.js';
import updateCartTemplateOrMiniCart from '../utils/update-cart-template-mini-cart.js';

export default class ItemQuantity extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.addEventListener('click', this.clickEvent);
		this.addEventListener('change', this.inputChangeEvent);

	}

	clickEvent(e) {

		e.preventDefault();

		const clickDecrease = e.target.matches('#qty-decrease') ? true : false;
		const clickIncrease = e.target.matches('#qty-increase') ? true : false;

		if (clickDecrease || clickIncrease) this.increaseDecreaseInputValue(e.target);

	}

	inputChangeEvent() {

		const line = parseInt(this.dataset.itemIndex);
		const quantity = parseInt(this.quantityInput.value);
		
		this.postChangeToCart(line, quantity);

	}

	increaseDecreaseInputValue(trigger) {

		const itemKey = this.dataset.itemKey;
		const line = parseInt(this.dataset.itemIndex);
		const value = parseInt(this.quantityInput.value);
		const quantity = trigger.matches('#qty-increase') ? value + 1 : value - 1 ;

		const item = this.closestCartItem(line);

		item.classList.add('updating');

		if (quantity > 0) {

			this.postChangeToCart(line, quantity);

		} else {

			this.postUpdateToCart(line, itemKey);

		}

	}

	async postChangeToCart(line, quantity) {

		const response = await cartPOSTChange(line, quantity);
		const cartObj = await response.json();

		if (response.ok) {

			await updateCartTemplateOrMiniCart(cartObj);

		} else {

			this.cartErrorHandler(line, cartObj.message);

		}

	}

	async postUpdateToCart(line, itemKey) {

		const itemKeyToDelete = { [itemKey] : 0 }

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

		item.classList.remove('updating');

		item.querySelector('.item-error').innerText = message;
		item.querySelector('.item-error').style.display = 'block';

	}

	get quantityInput() {
		return this.querySelector('.item-qty__input');
	}

	closestCartItem(line) {
		return this.closest(`div[data-cart-item-index="${line}"]`);
	}

}

window.customElements.define('item-quantity', ItemQuantity);