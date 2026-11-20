// src/js/utils/section-rendering-api.js
async function renderSectionAPI(sectionId, path) {
  if (sectionId === "")
    return;
  const locationPath = path === void 0 ? window.Shopify.routes.root : path;
  let sectionRequestString = `?section_id=${sectionId}`;
  if (locationPath.includes("?")) {
    sectionRequestString = sectionRequestString.replace("?", "&");
  }
  try {
    const url = `${locationPath}${sectionRequestString}`;
    const response = await fetch(url);
    if (response.ok) {
      const responseText = await response.text();
      const html = new DOMParser().parseFromString(responseText, "text/html").querySelector(`#shopify-section-${sectionId}`);
      return html;
    } else {
      errorHandler(response, `Failed to fetch sections: ${response.status}`);
      return null;
    }
  } catch (error) {
    errorHandler(error, `Network error: ${error.message}`);
    return null;
  }
}
function errorHandler(response, error) {
  console.log(response);
  console.log(response.message);
  console.error("There was an error getting these sections:", error);
  throw error;
}

// src/js/sections/product/product-recommends.js
var ProductRecommends = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.productRecommends = this.querySelector(".product-recommends");
    this.sectionId = this.productRecommends.dataset.sectionId;
    this.productId = this.productRecommends.dataset.productId;
    this.returnLimit = this.productRecommends.dataset.returnLimit;
    this.apiPath = `/recommendations/products?product_id=${this.productId}&limit=${this.returnLimit}&intent=related`;
    this.useRecommendAPI = this.productRecommends.dataset.recommendApi === "true" ? true : false;
    if (this.useRecommendAPI)
      this.callRenderSectionAPI();
  }
  async callRenderSectionAPI() {
    try {
      const html = await renderSectionAPI(this.sectionId, this.apiPath);
      if (html !== null)
        this.renderRecommendsHTML(html);
    } catch (error) {
      this.errorHandler(error);
    } finally {
    }
  }
  renderRecommendsHTML(html) {
    if (this.countReturnedProducts(html) < 1)
      return;
    const sectionStylesheet = html.querySelector("[data-section-stylesheet]");
    if (sectionStylesheet)
      this.appendChild(sectionStylesheet);
    if (upsellProducts) {
      this.productRecommends.style.display = "block";
    }
  }
  countReturnedProducts(html) {
    const items = html.querySelectorAll("product-card");
    return items.length;
  }
  errorHandler(error) {
    return console.error("Failed to render Product Recommendations:", error);
  }
};
window.customElements.define("product-recommends", ProductRecommends);
export {
  ProductRecommends as default
};
//# sourceMappingURL=product.bundle.product-recommends.js.map
