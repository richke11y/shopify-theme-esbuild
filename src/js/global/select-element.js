import '../../scss/global/_custom-select.scss';

export default class SelectElement extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.defaultValue = this.selectElement.value;

		this.setValueInput();

		this.selectElement.addEventListener('change', this.changeEvent.bind(this));

	}

	changeEvent() {

		this.setValueInput();

	}

	setValueInput() {

		const inputValue = this.querySelector('.custom-select__value');

		const value = this.selectElement.options[this.selectElement.selectedIndex].text;

		inputValue.innerHTML = value;

	}

	reset() {

		this.selectElement.value = this.defaultValue;

		this.setValueInput();

	}

	get selectElement() {
		return this.querySelector('select');
	}

}

window.customElements.define('select-element', SelectElement);