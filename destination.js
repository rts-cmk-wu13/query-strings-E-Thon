let search = window.location.search;
// search er alt det der kommer efter ? i linkadressen (inkl ?)

let params = new URLSearchParams(search);
console.log(params);
let id = params.get("id");
console.log(id);

fetch(`./date/${id}.json`)
  .then((response) => response.json())
  .then((data) => console.log(data));
