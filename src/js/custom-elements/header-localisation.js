// import '../../scss/global/_header-localisation.scss';

export default class HeaderLocalisation extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {

		this.localisationForm.addEventListener('change', this.onFormChange);

	}

	onFormChange() {

		const select = this.querySelector('select[name="country"]');
		const input = this.querySelector('input[name="country_code"]');
		const selectValue = select.value;

		input.value = selectValue;

		this.submit();

	}

	get localisationForm() {
		return this.querySelector('#localization_form');
	}

}

window.customElements.define('header-localisation', HeaderLocalisation);