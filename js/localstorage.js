// evt.target.dataset.favorites

let favoriteIcon = [];

function saveToLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}