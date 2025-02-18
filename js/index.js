fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    let sectionElm = document.createElement("section");
    sectionElm.innerHTML = `         
    <h1 class="section__h1">Apartments for rent</h1>
    `
    let destinationsElm = data.destinations
      .map(
        (destination) => `
          <div class="destination">
            <img src="./img/${destination.image}" alt="${destination.name}">
            <div class="destination__div">
              <button><i data-favorites="${destination.destination}${destination.id}" class="fa-solid fa-heart"></i></button>
              <a href="destination.html?id=${destination.id}">more
              </a>
            </div>
          </div>
        `
      )
      .join("");

    sectionElm.innerHTML += destinationsElm;

    document.querySelector("#root").append(sectionElm);
  });
