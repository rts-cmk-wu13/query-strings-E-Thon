fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    let sectionElm = document.createElement("section");

    sectionElm.innerHTML = data.destinations
      .map(
        (destination) => `
          <h1>Appartments for rent</h1>
          <div class="destination">
            <img src="./img/${destination.image}">
            <div class="destination__div">
              <i class="fa-solid fa-heart"></i>
              <a href="destination.html?id=${destination.id}">more
              </a>
            </div>
          </div>
        `
      )
      .join("");

    document.querySelector("#root").append(sectionElm);
  });
