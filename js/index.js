let favorites = readFromLocalStorage("favorites") || [];


fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    let sectionElm = document.createElement("section");
    sectionElm.innerHTML = `         
    <h1 class="section__h1">Apartments for rent</h1>
    `;
    let destinationElm = document.createElement("div");
    destinationElm.classList.add("destinations");

    destinationElm.innerHTML = data.destinations
      .map(
        (destination) => `
          <div class="destination">
            <img src="./img/${destination.image}" alt="${destination.name}">
            <div class="destination__div">
              <button class="destination__favoritebtn">
                <i data-favid="${destination.destination}${destination.id}" class="fa-regular fa-heart"></i>
              </button>
              <a href="destination.html?id=${destination.id}">more</a>
            </div>
          </div>
        `
      )
      .join("");

    destinationElm
      .querySelectorAll(".destination__favoritebtn")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          let currentId = event.target.dataset.favid;

          if (favorites.includes(currentId)) {
            let newFavorites = favorites.filter((id) => id != currentId);
            favorites = newFavorites;
            event.target.classList.remove("fa-solid");
            event.target.classList.add("fa-regular");
            event.target.style.color = "black";
          } else {
            favorites.push(currentId);
            event.target.classList.add("fa-solid");
            event.target.classList.remove("fa-regular");
            event.target.style.color = "red";
          }

          saveToLocalStorage("favorites", favorites);

          console.log(favorites);
        });
      });

    sectionElm.appendChild(destinationElm);

    document.querySelector("#root").append(sectionElm);
  });



  // note to self: favoritternes farve og ikon indlæses ikke automatisk, når siden refresher.