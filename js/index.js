fetch("./data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    let sectionElm = document.createElement("section");

    sectionElm.innerHTML = data.destinations
      .map(
        (destination) => `
      <img src="./img/${destination.image}">
        <a href="destination.html?id=${destination.id}">
        ${destination.title}
        </a>`
      )
      .join("");

    document.querySelector("#root").append(sectionElm);
  });
