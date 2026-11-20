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
  } catch (error2) {
    errorHandler(error2, `Network error: ${error2.message}`);
    return null;
  }
}
function errorHandler(response, error2) {
  console.log(response);
  console.log(response.message);
  console.error("There was an error getting these sections:", error2);
  throw error2;
}

// src/js/web-components/cookie-consent-banner.js
var CookieConsentBanner = class extends HTMLElement {
  connectedCallback() {
    this.body = document.querySelector("body");
    this.addEventListener("click", this.clickEvent);
  }
  clickEvent(e) {
    const clickAcceptButton = e.target.matches("#btn-accept") ? true : false;
    const clickManageButton = e.target.matches("#btn-manage") ? true : false;
    if (clickAcceptButton)
      this.setConsentChoices();
    if (clickManageButton)
      this.toggleConsentOptions();
  }
  setConsentChoices() {
    const consentOptions = this.querySelector(".consent-options");
    const choices = {
      "analytics": consentOptions.querySelector("#consent-analytics").checked,
      "preferences": consentOptions.querySelector("#consent-preferences").checked,
      "marketing": consentOptions.querySelector("#consent-marketing").checked,
      "sale_of_data": consentOptions.querySelector("#consent-sale").checked
    };
    window.Shopify.customerPrivacy.setTrackingConsent(choices);
    this.removeCookieConsentBanner();
  }
  toggleConsentOptions() {
    const consentOptions = this.querySelector(".consent-options");
    consentOptions.classList.toggle("show");
  }
  removeCookieConsentBanner() {
    this.body.removeChild(this);
  }
};
window.customElements.define("cookie-consent-banner", CookieConsentBanner);
async function initCookieConsentBanner() {
  if (window.Shopify.customerPrivacy === void 0)
    return;
  const shouldShowBanner = window.Shopify.customerPrivacy.shouldShowBanner();
  const currentConsent = window.Shopify.customerPrivacy.currentVisitorConsent();
  const checkIfVisitorConsentNeeded = (obj) => {
    for (let key in obj) {
      if (obj[key] === "" || obj[key] === null)
        return true;
    }
    return false;
  };
  if (shouldShowBanner && checkIfVisitorConsentNeeded(currentConsent)) {
    try {
      const html = await renderSectionAPI("cookie-consent-banner", "/");
      renderNewHTML(html);
    } catch (error2) {
      errorHandler2(error2);
    }
  }
}
function renderNewHTML(html) {
  if (html === null)
    errorHandler2(error);
  const body = document.querySelector("body");
  const template = document.createElement("template");
  template.innerHTML = html.innerHTML;
  const clone = template.content.cloneNode(true);
  body.append(clone);
}
function errorHandler2(error2) {
  return console.error(error2);
}
function loadConsentTracking() {
  window.Shopify.loadFeatures(
    [
      {
        name: "consent-tracking-api",
        version: "0.1"
      }
    ],
    (error2) => {
      if (error2) {
        console.error(error2);
      }
      initCookieConsentBanner();
    }
  );
}
window.addEventListener("load", loadConsentTracking);
//# sourceMappingURL=web-components.bundle.cookie-consent-banner.js.map
