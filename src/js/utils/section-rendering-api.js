//shopify.dev/docs/api/ajax/section-rendering
export async function renderSectionAPI(sectionId, path) {

	if (sectionId === '') return;
	
	let locationPath = path;
	let sectionRequestString = `?section_id=${sectionId}`;

	if (locationPath === undefined) locationPath = window.Shopify.routes.root

	if (locationPath.includes('?')) {

		sectionRequestString = sectionRequestString.replace('?', '&');

	}

	const url = `${locationPath}${sectionRequestString}`;

	const response = await fetch(url);
	const responseText = await response.text();

	const html = new DOMParser().parseFromString(responseText, 'text/html').querySelector(`#shopify-section-${sectionId}`);

	return html;

}