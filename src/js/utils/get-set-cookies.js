function getCookie(cName) {

	const name = cName + '=';
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded .split('; ');
	let result;

	cArr.forEach(val => {

		if (val.indexOf(name) === 0) result = val.substring(name.length);

	});

	return result;

}


function setCookie(name, value, expires, path) {

	let cookie = '';

	cookie = `${name}=${value}; path=${path}`;

	if (expires > 0) {

		let date = new Date();

		date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));

		const expiresString = `expires=${date.toUTCString()}`;
		const max = `max-age=${expires * 86400}`;

		cookie = `${cookie}; ${expiresString}; ${max}`;

	}

	document.cookie = cookie;

}

export { getCookie, setCookie };