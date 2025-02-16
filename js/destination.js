let search = window.location.search;
// search er alt det der kommer efter ? i linkadressen (inkl ?)

let params = new URLSearchParams(search);
let id = params.get("id");

fetch(`./data/${id}.json`)
  .then((response) => response.json())
  .then((data) => {
    let bodyElm = document.querySelector("body");
    let appartment = document.createElement("div");
    appartment.classList.add("appartment__div");

    appartment.innerHTML = `
    <div class="appartment__div--left">
      <img src="./img/${data.image}" alt="${data.title}">
      <p><i class="fa-solid fa-heart"></i> favorit</p>
    </div>

    <div class="appartment__div--right">
      <h3>${data.destination}</h3>
      <h1>${data.title}</h1>
      <sub>${data.subtitle}</sub>
      <p>${data.text}</p>
      <h2>Faciliteter</h2>
      <ul class="appartment__ul">
        <li>${data.facilities[0]}</li>
        <li>${data.facilities[1]}</li>
        <li>${data.facilities[2]}</li>
        <li>${data.facilities[3]}</li>
        </ul>
    </div>
    `;

    bodyElm.appendChild(appartment);
  });
