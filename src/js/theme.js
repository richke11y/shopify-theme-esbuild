import {name} from '../../package.json';
import {version} from '../../package.json';
import {author} from '../../package.json';

import 'the-new-css-reset/css/reset.css';

import '../scss/theme.scss';
import './includes/header.js';

window.onload = console.log(`%c ${name} (${version}) \n Web & Shopify Development: ${author}`,`background: black; color: white; text-transform: uppercase;`);