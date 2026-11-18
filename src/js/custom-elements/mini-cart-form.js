import ItemDelete from './item-delete.js';
import ItemQuantity from './item-quantity.js';

export default class MiniCartForm extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {}

}

window.customElements.define('mini-cart-form', MiniCartForm);