//shopify.dev/docs/themes/ajax-api/reference/cart
//github.com/Shopify/theme-scripts/tree/master/packages/theme-cart

/**
 * Sends a POST request to Shopify Cart API, with data regarding the Cart Item Line number and updated Quantity.
 * @function cartPOSTChange
*/
export function cartPOSTChange(line, quantity) {

	// console.log('cartPOSTChange');

	// if (typeof key !== 'string') {

	// 	throw new TypeError('The provided key is not a String');

	// }

	if (typeof line !== 'number') {

		throw new TypeError('The provided quantity is not a Number');

	}

	if (typeof quantity !== 'number') {

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

	const response = fetch(`${window.Shopify.routes.root}cart/change.js`, settings);

	return response;

}

/**
 * Sends a GET request to Shopify Cart API to get JSON data once a product is added / updated.
 * Sends JSON data object to updateMiniCart.
 * @function cartGETState
*/
export async function cartGETState() {

	// console.log('cartGETState');

	const response = await fetch(`${window.Shopify.routes.root}cart.js`);

	if (response.status === 200) {

		const cart = await response.json();

		return cart;

	}

	await Promise.reject(new Error('Failed to get request, Shopify returned... ' + response.status + ' ' + response.statusText));

}

/**
 * Sends a POST request to Shopify Cart API, with data object regarding the Cart Item to add.
 * @function cartPOSTAdd
*/
export async function cartPOSTAdd(data) {

	// console.log('cartPOSTAdd');

	const settings = {
		method: 'POST',
		body: data
		// headers: { 'Content-Type': 'application/json; charset=utf-8' },
		// body: JSON.stringify(data)
	}

	const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, settings)

	// console.log(response);
	// console.log(response.status);

	// if (response.status === 200) {

	// 	return response.json();

	// } else if (response.status === 422) {

	// 	// console.log(response.description);
	// 	return response.json();

	// }

	return response;

	await Promise.reject(new Error('Failed to get request, Shopify returned: ' + response.status + ' ' + response.statusText));

}
