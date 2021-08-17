import {error, notice } from '../../node_modules/@pnotify/core/dist/PNotify.js';


export default function fetchCountries(searchQuery) {

   return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then((response) => {
      if (response.ok !== true && response.status !== 200) {
        error({
      title: 'Error! No match.',
      text: 'Please check your spell!',
           delay: 2000,
      icon: true
        });         
      }

      
      return response.json()
   }) 
    
}
// error({
//         title: 'Too many matches found.',
//             text: 'Please enter a more specific query!',
//     delay: 1000
//   });