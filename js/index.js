let favorites = readFromLocalStorage("favorites") || [];

fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    let sectionElm = document.createElement("section");
    sectionElm.innerHTML = `         
    <form class="switch" action="#" method="post">
            <label class="switch__txt" for="switch">Dark mode </label>
            <input type="checkbox" name="switch" id="switch" value="false" switch class="switch__check">
            <span class="slider"></span> 
        </form>
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
        let icon = button.querySelector("i");
        let currentId = icon.dataset.favid;

        if (favorites.includes(currentId)) {
          icon.classList.add("fa-solid");
          icon.classList.remove("fa-regular");
          icon.style.color = "red";
        }

        button.addEventListener("click", function (event) {
          if (favorites.includes(currentId)) {
            favorites = favorites.filter((id) => id != currentId);
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "black";
          } else {
            favorites.push(currentId);
            icon.classList.add("fa-solid");
            icon.classList.remove("fa-regular");
            icon.style.color = "red";
          }
          saveToLocalStorage("favorites", favorites);
        });
      });

    sectionElm.appendChild(destinationElm);
   

    document.querySelector("#root").append(sectionElm);
    darkLight()
  });