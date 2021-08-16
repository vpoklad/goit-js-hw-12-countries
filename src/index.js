import './sass/main.scss';
import listTemplate from './templates/list';
import countryTeplate from './templates/country_entires';
let debounce = require('lodash.debounce');

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
    console.log('alert');
    }
    
    refs.target.innerHTML = markup;
})
    
}





