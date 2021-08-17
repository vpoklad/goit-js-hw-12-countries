export default function fetchFromListCountries(searchQuery) {

   return fetch(`https://restcountries.eu/rest/v2/alpha/${searchQuery}`).then(r => r.json()).catch( error => console.log(error)) 
    
}