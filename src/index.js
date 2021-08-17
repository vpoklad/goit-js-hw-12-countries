import './sass/main.scss';
import '../node_modules/@pnotify/core/BrightTheme.css';

import fetchCountries from './js/fetchCountries'
import fetchFromListCountries from './js/fetchFromList'

import listTemplate from './templates/list';
import countryTeplate from './templates/country_entires';
import countryFromListTeplate from './templates/countryFromList';

import {error, notice } from '../node_modules/@pnotify/core/dist/PNotify.js';


const debounce = require('lodash.debounce');
  

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
    if (e.target.nodeName !== "LI") return;
markup = ''
    searchQuery = e.target.dataset.code;
    
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
         refs.target.innerHTML = '';
    }
    else if (data.length > 10) {
         notice({
        title: 'Too many matches found.',
            text: 'Please enter a more specific query!',
    delay: 2000
  });
    }


}

function createMarkupfromList(data) {
    markup = countryFromListTeplate(data);
        refs.target.innerHTML = markup;
        refs.countryList.innerHTML = '';
        refs.input.value = '';
    }

    


