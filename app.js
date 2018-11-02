// fetching data 
const endpoint =
    'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.querySelector(".search");
const cities = [];
let listOfMatches = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
// 

// searching for matches
const searchFunc = (e) => {
    listOfMatches = [];
    const citiesMatch = cities.filter(location => {
        if (e.target.value === "") return;
        if (location.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
            location.state.toLowerCase().includes(e.target.value.toLowerCase())) {
            listOfMatches.push(location)
        }
    })
}
// 
// commas in populations // view fix
const numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 
// displaying matching cities/states
const displayMatches = function (e) {
    const ul = document.querySelector(".suggestions");
    const html = listOfMatches.map(location => {
        // adding style in searched words
        const regex = new RegExp(this.value, "gi");
        const cityName = location.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const cityState = location.state.replace(regex, `<span class="hl">${this.value}</span>`);
        //
        //  returns an array of items, then joins it 
        return `
        <li>
        <span class="name">${cityName}, ${cityState}</span>
        <span class="population">${numberWithCommas(location.population)}</span>
    </li>
    `
    }).join("");
    // 
    // initial state
    ul.innerHTML = html;
    if (listOfMatches.length === 0 || e.target.value === " ") {
        ul.innerHTML =
            `
            <li>Filter for a city</li>
             <li>or a state</li>
           `
    }
}

input.addEventListener("input", searchFunc);
input.addEventListener("input", displayMatches);