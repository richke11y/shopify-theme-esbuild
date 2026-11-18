const formMiniCart = document.querySelector('form-mini-cart');
const cartForm = document.querySelector('cart-form');

export default async function updateCartTemplateOrMiniCart(cartObj) {

	console.log('updateCartTemplateOrMiniCart');

	// Used to catch whether Mini Cart is on the page (not on Cart template)
	if (formMiniCart !== null) await formMiniCart.updateMiniCart(cartObj);

	// If we're on the Cart template
	if (cartForm) await cartForm.updateCartForm(cartObj);

}