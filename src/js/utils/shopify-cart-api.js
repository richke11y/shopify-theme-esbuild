//shopify.dev/docs/themes/ajax-api/reference/cart
//github.com/Shopify/theme-scripts/tree/master/packages/theme-cart

/**
 * Sends a POST request to Shopify Cart API, with data regarding the Cart Item Line number and updated Quantity.
 * @function cartPOSTChange
*/
export function cartPOSTChange(line, quantity) {

	if (typeof quantity !== 'number' || typeof line !== 'number') {

		throw new TypeError('The provided quantity is not a Number');

	}

	const settings = {

		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			// id: key,
			line: line,
			quantity: quantity
		})

	}

	const url = `${window.Shopify.routes.root}cart/change.js`;

	const response = fetch(url, settings);

	return response;

}

export function cartPOSTChangeProperties(id, properties) {

	if (typeof id !== 'number' || typeof id !== 'string') {

		throw new TypeError('The provided quantity is not a Number');

	}

	if (typeof properties !== 'object') {

		throw new TypeError('The provided parameter is not an Object');

	}

	const settings = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify({
			id: id,
			properties: properties
		})
	}

	const url = `${window.Shopify.routes.root}cart/change.js`;

	const response = fetch(url, settings);

	return response;

}

export function cartPOSTUpdate(jsonObject) {

	if (typeof jsonObject !== 'object') {

		throw new TypeError('The provided parameter is not an Object');

	}

	const settings = {

		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify(jsonObject)

	}

	const url = `${window.Shopify.routes.root}cart/update.js`;

	const response = fetch(url, settings);

	return response;

}

/**
 * Sends a GET request to Shopify Cart API to get JSON data once a product is added / updated.
 * Sends JSON data object to updateMiniCart.
 * @function cartGETState
*/
export async function cartGETState() {

	const url = `${window.Shopify.routes.root}cart.js`;

	const response = await fetch(url);

	if (response.ok) {

		const cart = await response.json();

		return cart;

	}

	await Promise.reject(new Error('Failed to get request, Shopify returned... ' + response.status + ' ' + response.statusText));

}

/**
 * Sends a POST request to Shopify Cart API, with FormData object regarding the Cart Item to add.
 * @function cartPOSTAdd
*/
export async function cartPOSTAdd(formDataObject, jsonObject) {

	let settings = {
		method: 'POST'
	}

	if (formDataObject) settings.body = formDataObject;

	if (jsonObject) {
		
		settings.headers = { 'Content-Type': 'application/json; charset=utf-8' };
		settings.body = JSON.stringify(jsonObject);
	
	}

	const url = `${window.Shopify.routes.root}cart/add.js`

	const response = await fetch(url, settings)

	return response;

	await Promise.reject(new Error('Failed to get request, Shopify returned: ' + response.status + ' ' + response.statusText));

}