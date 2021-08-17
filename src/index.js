import './sass/main.scss';
import '../node_modules/@pnotify/core/BrightTheme.css';
import listTemplate from './templates/list';
import countryTeplate from './templates/country_entires';

import {error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
const debounce = require('lodash.debounce');
  defaultModules.set(PNotifyMobile, {});

const refs = {
    input: document.querySelector('.inputJS'),
    target: document.querySelector('.target'),
};
let markup = ''
let searchQuery = ''

refs.input.addEventListener('input', debounce(onTextInput, 500));

function onTextInput(e) {
    markup = ''
    searchQuery = e.target.value
    fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(r => r.json()).then((data) => {
    console.log(data.length);

    
    if (data.length === 1) {
        markup = countryTeplate(data);       
    }

    else if (data.length > 1 && data.length <= 10) {
        markup = listTemplate(data)
    } 
    else {
        error({
        title: 'Too many matches found.',
    text: 'Please enter a more specific query!'
  });
    }
    
    refs.target.innerHTML = markup;
})
    
}





