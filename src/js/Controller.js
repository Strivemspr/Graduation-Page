// SCSS Webpack
import "../scss/main.scss";

// Preload
import { preload } from './utilities/preload';
import lightbox from 'lightbox2/dist/js/lightbox';

lightbox.option({
    'disableScrolling': true,
});

// Initialization Function
function init() {
    preload();
}

init();