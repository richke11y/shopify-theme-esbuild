//shopify.dev/docs/api/ajax/section-rendering
export async function renderSectionAPI(sectionId, path) {

	if (sectionId === '') return;

	// let locationPath = path;
	// let sectionRequestString = `?section_id=${sectionId}`;

	// if (locationPath === undefined) locationPath = window.Shopify.routes.root

	const locationPath = path === undefined ? window.Shopify.routes.root : path;

	let sectionRequestString = `?section_id=${sectionId}`;

	if (locationPath.includes('?')) { 
		
		sectionRequestString = sectionRequestString.replace('?', '&'); 
	
	}

	try {

		const url = `${locationPath}${sectionRequestString}`;
		const response = await fetch(url);

		if (response.ok) {

			const responseText = await response.text();

			const html = new DOMParser().parseFromString(responseText, 'text/html').querySelector(`#shopify-section-${sectionId}`);

			return html;

		} else {

			errorHandler(response, `Failed to fetch sections: ${response.status}`);
			
			return null; // Return null in case of failure

		}

	} catch(error) {

		// Catch fetch errors (network issues, etc.)
		errorHandler(error, `Network error: ${error.message}`);

		return null; // Return null on network error

	}

}

export async function renderMultipleSections(sectionsIds, path) {

	if (!sectionsIds || sectionsIds.length === 0) return null;

	let locationPath = path;

	let requestString = `?sections=${sectionsIds.join(',')}`;

	if (locationPath.includes('?')) {

		requestString = requestString.replace('?', '&');

	}

	try {

		const url = `${locationPath}${requestString}`;
		const response = await fetch(url);

		// Check if the response is successful
		if (response.ok) {

			const json = await response.json();
			return json; // Return the sections data

		} else {

			// If response status isn't 200, trigger error handler
			errorHandler(response, `Failed to fetch sections: ${response.status}`);
			return null; // Return null in case of failure

		}

	} catch (error) {

		// Catch fetch errors (network issues, etc.)
		errorHandler(error, `Network error: ${error.message}`);
		return null; // Return null on network error

	}

}

function errorHandler(response, error) {

	console.log(response);
	console.log(response.message);

	console.error('There was an error getting these sections:', error);

	throw error;
	
}