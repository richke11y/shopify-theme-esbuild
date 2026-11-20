// src/js/utils/shopify-cart-api.js
function cartPOSTChange(line2, quantity) {
  if (typeof quantity !== "number" || typeof line2 !== "number") {
    throw new TypeError("The provided quantity is not a Number");
  }
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      // id: key,
      line: line2,
      quantity
    })
  };
  const url = `${window.Shopify.routes.root}cart/change.js`;
  const response = fetch(url, settings);
  return response;
}
function cartPOSTUpdate(jsonObject) {
  if (typeof jsonObject !== "object") {
    throw new TypeError("The provided parameter is not an Object");
  }
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(jsonObject)
  };
  const url = `${window.Shopify.routes.root}cart/update.js`;
  const response = fetch(url, settings);
  return response;
}

// src/js/utils/update-cart-template-mini-cart.js
var formMiniCart = document.querySelector("form-mini-cart");
var cartForm = document.querySelector("cart-form");
async function updateCartTemplateOrMiniCart(cartObj) {
  console.log("updateCartTemplateOrMiniCart");
  if (formMiniCart !== null)
    await formMiniCart.updateMiniCart(cartObj);
  if (cartForm)
    await cartForm.updateCartForm(cartObj);
}

// src/js/custom-elements/item-delete.js
var ItemDelete = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addEventListener("click", this.clickEvent.bind(this));
  }
  clickEvent(e) {
    e.preventDefault();
    const clickItemDelete = e.target.matches(".item-delete") ? true : false;
    if (clickItemDelete)
      this.deleteCartLineItem(e.target);
  }
  async deleteCartLineItem(trigger) {
    try {
      const itemKey = trigger.dataset.cartKey;
      const line2 = parseInt(trigger.dataset.cartItemIndex);
      const item = this.closestCartItem(line2);
      const itemKeyToDelete = { [itemKey]: 0 };
      item.classList.add("updating");
      await this.postUpdateToCart(line2, itemKeyToDelete);
    } catch (error) {
      this.cartErrorHandler(line, error);
    }
  }
  async postUpdateToCart(line2, itemKeyToDelete) {
    const updates = itemKeyToDelete;
    const response = await cartPOSTUpdate({ updates });
    const cartObj = await response.json();
    if (response.ok) {
      await updateCartTemplateOrMiniCart(cartObj);
    } else {
      this.cartErrorHandler(line2, cartObj.message);
    }
  }
  cartErrorHandler(line2, message) {
    console.error(message);
    const item = this.closestCartItem(line2);
    item.classList.remove("deleting");
    item.querySelector(".item-error").innerText = message;
    item.querySelector(".item-error").style.display = "block";
  }
  closestCartItem(line2) {
    return this.closest(`div[data-cart-item-index="${line2}"]`);
  }
};
window.customElements.define("item-delete", ItemDelete);

// src/js/custom-elements/item-quantity.js
var ItemQuantity = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addEventListener("click", this.clickEvent);
    this.addEventListener("change", this.inputChangeEvent);
  }
  clickEvent(e) {
    e.preventDefault();
    const clickDecrease = e.target.matches("#qty-decrease") ? true : false;
    const clickIncrease = e.target.matches("#qty-increase") ? true : false;
    if (clickDecrease || clickIncrease)
      this.increaseDecreaseInputValue(e.target);
  }
  inputChangeEvent() {
    const line2 = parseInt(this.dataset.itemIndex);
    const quantity = parseInt(this.quantityInput.value);
    this.postChangeToCart(line2, quantity);
  }
  increaseDecreaseInputValue(trigger) {
    const itemKey = this.dataset.itemKey;
    const line2 = parseInt(this.dataset.itemIndex);
    const value = parseInt(this.quantityInput.value);
    const quantity = trigger.matches("#qty-increase") ? value + 1 : value - 1;
    const item = this.closestCartItem(line2);
    item.classList.add("updating");
    if (quantity > 0) {
      this.postChangeToCart(line2, quantity);
    } else {
      this.postUpdateToCart(line2, itemKey);
    }
  }
  async postChangeToCart(line2, quantity) {
    const response = await cartPOSTChange(line2, quantity);
    const cartObj = await response.json();
    if (response.ok) {
      await updateCartTemplateOrMiniCart(cartObj);
    } else {
      this.cartErrorHandler(line2, cartObj.message);
    }
  }
  async postUpdateToCart(line2, itemKey) {
    const itemKeyToDelete = { [itemKey]: 0 };
    const updates = itemKeyToDelete;
    const response = await cartPOSTUpdate({ updates });
    const cartObj = await response.json();
    if (response.ok) {
      await updateCartTemplateOrMiniCart(cartObj);
    } else {
      this.cartErrorHandler(line2, cartObj.message);
    }
  }
  cartErrorHandler(line2, message) {
    console.error(message);
    const item = this.closestCartItem(line2);
    item.classList.remove("updating");
    item.querySelector(".item-error").innerText = message;
    item.querySelector(".item-error").style.display = "block";
  }
  get quantityInput() {
    return this.querySelector(".item-qty__input");
  }
  closestCartItem(line2) {
    return this.closest(`div[data-cart-item-index="${line2}"]`);
  }
};
window.customElements.define("item-quantity", ItemQuantity);

// src/js/custom-elements/mini-cart-form.js
var MiniCartForm = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
  }
};
window.customElements.define("mini-cart-form", MiniCartForm);
//# sourceMappingURL=draws.bundle.draw-mini-cart.js.map
