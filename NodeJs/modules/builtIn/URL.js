//? URL - uniform resource locator
// unique way to find the resources or data on the internet or browser

const url = require('url')
 
const myURL = new URL('https://www.example.com:8000/path/name?query=string#hash')
console.log(myURL)
console.log(myURL.searchParams)
console.log(myURL.searchParams.get('query')) // string

