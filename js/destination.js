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
      <p><i data-favid="${data.destination}${data.id}" class="fa-solid fa-heart"></i> favorit</p>
    </div>

    <div class="appartment__div--right">
      <h2>${data.destination}</h2>
      <h1>${data.title}</h1>
      <sub>${data.subtitle}</sub>
      <p>${data.text}</p>
      <h3>Faciliteter</h3>
      <ul class="appartment__ul">
        <li>${data.facilities[0]}</li>
        <li>${data.facilities[1]}</li>
        <li>${data.facilities[2]}</li>
        <li>${data.facilities[3]}</li>
        </ul>
    </div>
    `;
    
    let favorites = readFromLocalStorage("favorites") || [];
    let heartIcon = appartment.querySelector("i");
    let currentId = heartIcon.dataset.favid;

    if (favorites.includes(currentId)) {
      heartIcon.classList.add("fa-solid");
      heartIcon.classList.remove("fa-regular");
      heartIcon.style.color = "red";
    }

    // Handle the favorite button click event
    heartIcon.addEventListener("click", function () {
      if (favorites.includes(currentId)) {
        favorites = favorites.filter((id) => id != currentId);
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
        heartIcon.style.color = "black";
      } else {
        favorites.push(currentId);
        heartIcon.classList.add("fa-solid");
        heartIcon.classList.remove("fa-regular");
        heartIcon.style.color = "red";
      }
      saveToLocalStorage("favorites", favorites);
    });

    bodyElm.appendChild(appartment);
  });
