import './sass/main.scss';
import '../node_modules/@pnotify/core/BrightTheme.css';

import fetchCountries from './js/fetchCountries'
import fetchFromListCountries from './js/fetchFromList'

import listTemplate from './templates/list';
import countryTeplate from './templates/country_entires';
import countryFromListTeplate from './templates/countryFromList';

import {error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

const debounce = require('lodash.debounce');
  defaultModules.set(PNotifyMobile, {});

const refs = {
    input: document.querySelector('.inputJS'),
    target: document.querySelector('.target'),
    countryList: document.querySelector('.countries_list-JS')
};

let markup = ''
let searchQuery = ''

refs.input.addEventListener('input', debounce(onTextInput, 700));
refs.countryList.addEventListener('click',OnlistClick)

function OnlistClick(e) {
    if (event.target.nodeName !== "LI") return;
markup = ''
    searchQuery = e.target.dataset.code;
    console.log(searchQuery);
fetchFromListCountries(searchQuery).then(createMarkupfromList) 

    
}

function onTextInput(e) {
    markup = '';
    searchQuery = e.target.value;
    fetchCountries(searchQuery).then(createMarkup)  
    
}
    


function createMarkup(data) {
    if (data.length === 1) {
        markup = countryTeplate(data);
        refs.target.innerHTML = markup;
    }

    else if (data.length > 1 && data.length <= 10) {
        markup = listTemplate(data)
        refs.countryList.innerHTML = markup;
    } 
    else {
        error({
        title: 'Too many matches found.',
            text: 'Please enter a more specific query!',
    delay: 1000
  });
    }

}

function createMarkupfromList(data) {
    markup = countryFromListTeplate(data);
        refs.target.innerHTML = markup;
        refs.countryList.innerHTML = '';
        refs.input.value = '';
    }

    


