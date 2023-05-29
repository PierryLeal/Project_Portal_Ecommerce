const propsUrl = new URLSearchParams(window.location.search);
const id = propsUrl.get('id');
fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(json => {
    const imageElement = document.getElementById("product-image");
    imageElement.src = json.image;
    imageElement.alt = json.title;
    document.getElementById("product-title").textContent = json.title;
    document.getElementById("product-category").textContent = json.category;
    document.getElementById("product-description").textContent = json.description;
    document.getElementById("product-count").textContent = json.rating.count;
    document.getElementById("product-price").textContent = json.price.toFixed(2).toString().replace(".", ",");

    const firstStar = document.getElementById("first-star-classification");
    firstStar.src = 1 / json.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"
    const secondStar = document.getElementById("second-star-classification");
    secondStar.src = 2 / json.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"
    const thirdStar = document.getElementById("third-star-classification");
    thirdStar.src = 3 / json.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"
    const fourthStar = document.getElementById("fourth-star-classification");
    fourthStar.src = 4 / json.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"
    const fifthStar = document.getElementById("fifth-star-classification");
    fifthStar.src = 5 / json.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"

  })



let search;

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleSearchButtonClick();
  }
}

function handleSearchChange() {
  search = document.getElementById('input-search').value
  document.getElementById('input-search-mobile').value = search;
}

function handleSearchMobileChange() {
  search = document.getElementById('input-search-mobile').value
  document.getElementById('input-search').value = search ? search : '';

}

function handleSearchButtonClick() {
  document.getElementById('input-search').value = search ? search : '';
  document.getElementById('input-search-mobile').value = search ? search : '';
  search ? window.location.href = `index.html?search=${search.toString()}` : window.location.href = 'index.html'
}

document.getElementById('input-search').addEventListener('input', handleSearchChange);
document.getElementById('input-search-mobile').addEventListener('input', handleSearchMobileChange);

document.querySelector('.dropdown-toggle').addEventListener('click', function () {
  document.querySelector('.dropdown-menu').classList.toggle('show');
});