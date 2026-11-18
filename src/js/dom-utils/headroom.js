import Headroom from 'headroom.js';

export default function header() {

	const header = document.querySelector('.header');
	const homepageHero = document.querySelector('homepage-hero');

	let offset = 0;
	
	offset = header.offsetHeight;
	
	if (homepageHero) offset = homepageHero.offsetHeight * 0.4;

	const headroom  = new Headroom(header, {
		offset : offset,
		classes : {
			initial : 'header', // when element is initialised
			pinned : 'header--pinned', // when scrolling up
			unpinned : 'header--unpinned', // when scrolling down
			top : 'header--top', // when above offset
			notTop : 'header--not-top', // when below offset
			bottom : 'header--bottom', // when at bottom of scroll area
			notBottom : 'header--not-bottom', // when not at bottom of scroll area
			frozen: 'header--frozen', // when frozen method has been called
			// pinned: 'header--pinned' // multiple classes are also supported with a space-separated list
		}
	});
	
	headroom.init();

};

window.addEventListener('DOMContentLoaded', header, false);