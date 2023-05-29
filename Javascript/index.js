const propsUrl = new URLSearchParams(window.location.search);
const searchUrl = propsUrl.get('search');

const imagesCarrousel = [
  {
    title: 'Echo Dot',
    description: 'Tenha Alexa em qualquer ambiente',
    image: "./images/Carousel/alexa-removed.png",
    style: "background: linear-gradient(270deg, rgba(0,0,0,1) 5%, rgba(213,157,65,0.17130602240896353) 18%, rgba(213,157,65,0.3897934173669467) 82%, rgba(0,0,0,1) 95%);"
  },
  {
    title: '',
    description: '',
    image: "./images/Carousel/prime-video-removed.png",
    style: "background: linear-gradient(90deg, rgba(2,0,36,1) 10%, rgba(3,3,56,1) 24%, rgba(0,135,162,1) 42%, rgba(255,255,255,1) 66%, rgba(201,246,255,1) 93%, rgba(2,2,66,1) 97%, rgba(0,0,0,1) 100%);"
  },
  {
    title: 'Multicolor',
    description: 'Escolha a tinta ideal para sua casa',
    image: "./images/Carousel/tintas-removed.png",
    style: "background: linear-gradient(90deg, rgba(255,0,0,1) 4%, rgba(255,97,0,1) 10%, rgba(255,171,0,1) 15%, rgba(255,227,0,1) 22%, rgba(172,255,0,1) 29%, rgba(112,255,0,1) 36%, rgba(0,255,205,1) 43%, rgba(0,194,255,1) 49%, rgba(0,56,255,1) 55%, rgba(98,0,255,1) 62%, rgba(94,0,255,1) 69%, rgba(180,2,255,1) 74%, rgba(235,0,255,1) 81%, rgba(255,0,194,1) 87%, rgba(255,0,86,1) 92%, rgba(255,0,78,1) 96%, rgba(255,0,0,1) 100%);"
  },
]


imagesCarrousel.map(function (image, index) {
  document.querySelector('#carrousel-target').insertAdjacentHTML("beforeend",
    `<li style="cursor:pointer" data-target="#mainSlider" data-slide-to=${index} class=${index == 0 ? 'active' : ''}></li> `
  )
})

imagesCarrousel.map(function (item, index) {
  document.querySelector('#carrousel-itens').insertAdjacentHTML("beforeend",
    `<div class="carousel-item ` + (index == 0 ? 'active' : '') + ` h-100" style="background: wheat; ">
      <div class="carousel-item-style" style="${item.style} padding: 1rem ">
        <div style="width:30%; display: flex; flex-direction: column; align-items:center ;text-align: center">
          <h1 style="font-size: 4vw; font-weight: bold; font-style: italic; font-family: initial;">${item.title}</h1>
          <span style="font-size: 2vw; font-family: fantasy;">${item.description}</span>
        </div>
        <img class="d-block" src=${item.image} alt="Primeiro Slide"> 
      </div>
    </div>`
  )
})

const filterDepartment = [
  "Todos os departamentos",
  "Automotivo",
  "Beleza",
  "Brinquedos e Jogos",
  "Casa",
  "Computadores e Informática",
  "Cozinha",
  "Eletrodomésticos",
  "Eletrônicos",
  "Ferramentas e Materiais de construções",
  "Pet Shop",
  "Roupas, Calçados e Joias",
  "Saude e Cuidados pessoais",
]


const filterClassification = [
  "Todas as classificações",
]

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => {
    const uniqueRates = new Set();
    json.forEach((item) => {
      uniqueRates.add(item.rating.rate);
    });
    [...uniqueRates].sort((a, b) => a - b).forEach((value) => filterClassification.push(value.toFixed(1)));

    filterClassification.map(function (item, index) {
      document.querySelector('#select-classification').insertAdjacentHTML("beforeend",
        `<option style="max-height: 2rem" ${index === 0 ? "selected" : "value=" + item}>${item}</option>`
      )
    });
  })

const filterCategories = [
  "Todas as categorias",
]

fetch('https://fakestoreapi.com/products/categories')
  .then(res => res.json())
  .then(json => {
    json.forEach((value) =>
      filterCategories.push(value)
    );
    filterCategories.map(function (item, index) {
      document.querySelector('#select-categories').insertAdjacentHTML("beforeend",
        `<option ${index === 0 ? "selected" : "value=" + item}>${item}</option>`
      )
    })
  })


function filterByFivePrice(objects) {
  objects.sort((a, b) => b.price - a.price);
  return objects.slice(0, 5);
}

let search;
let minValue;
let maxValue;
let classification;
let categories;

if (searchUrl) {
  search = searchUrl;
  handleSearchButtonClick();
}

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
  document.getElementById('input-search').value = search;
}

function handleSearchButtonClick() {
  document.getElementById('input-search').value = search ? search : '';
  document.getElementById('input-search-mobile').value = search ? search : '';
  filterData();
}

document.getElementById('input-search').addEventListener('input', handleSearchChange);
document.getElementById('input-search-mobile').addEventListener('input', handleSearchMobileChange);

function handleButtonClick() {
  minValue = parseFloat(document.getElementById('min-value').value);
  maxValue = parseFloat(document.getElementById('max-value').value);
  classification = document.getElementById('select-classification').value;
  var selectElement = document.getElementById('select-categories');
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  categories = selectedOption.textContent;

  if (maxValue <= minValue) {
    if (maxValue === 0) {
      maxValue = null;
      document.getElementById('max-value').value = maxValue;
    }
    else {
      maxValue = minValue + 1;
      document.getElementById('max-value').value = maxValue;
    }
  }
  filterData();
}

function filterBySearch(objects) {
  if (search) {
    return objects.filter((value) => value.title.toLowerCase().includes(search.toLowerCase()))
  }
  return objects;
}
function filterByRate(objects) {
  if (classification && classification !== filterClassification[0]) {
    return objects.filter((value) => value.rating.rate === +classification)
  }
  return objects;
}
function filterByCategory(objects) {
  if (categories && categories !== filterCategories[0]) {
    return objects.filter((value) => value.category === categories)
  }
  return objects;
}

function filterByPrice(objects) {
  if (minValue || maxValue) {
    if (minValue && maxValue) {
      return objects.filter(value => value.price >= minValue && value.price <= maxValue);
    } else if (minValue) {
      return objects.filter(value => value.price >= minValue);
    } else if (maxValue) {
      return objects.filter(value => value.price <= maxValue);
    }
  }
  return objects;
}

function filterData() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
      let filteredData = filterBySearch(json);
      filteredData = filterByRate(filteredData);
      filteredData = filterByCategory(filteredData);
      filteredData = filterByPrice(filteredData);

      document.querySelector('#selling-items').innerHTML = '';
      document.querySelector('#most-reviwed-items').innerHTML = '';

      filteredData.map(function (item) {
        document.querySelector('#selling-items').insertAdjacentHTML("beforeend",
          `<div style="height: auto">
          <a  href="product.html?id=${item.id}">
            <div class="card-style">
              <div class="buying-item-style">
                <img style="max-height:100%; width:100%" src=${item.image} alt="">
              </div>
              <div>
                <p class="card-title-style" style="">${item.title}</p>
                <div id="star-classification" style="display: flex; margin: .5rem 0;">
                  <img height="10px" src=${1 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${2 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${3 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${4 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${5 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">  
                </div>
                <p>R$ ${item.price.toFixed(2)}</p>
              </div>
            </div>
          </a>
          </div>
          `
        );
      });

      filterByFivePrice(json).map(function (item) {
        document.querySelector('#most-reviwed-items').insertAdjacentHTML("beforeend",
          `<a href="product.html?id=${item.id}" style="width:100%">
            <div class="most-reviwed-item-style">
              <div style="background-color: #FFFFFF; height: 5rem; width: 5rem; min-width: 5rem; object-fit: cover; text-align: center;">
                <img src=${item.image} alt="" style="height: 100%; max-width:100%">
              </div>
              <div class="most-reviwed-information">
                <p style="color: #007bff; width: 100%">${item.title}</p>
                <div id="star-classification" style="display: flex; margin: .5rem 0;">
                  <img height="10px" src=${1 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${2 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${3 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${4 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">
                  <img height="10px" src=${5 / item.rating.rate <= 1 ? "./images/star-completed.svg" : "./images/star-empty.svg"} alt="">  
                </div>
                <p>R$ ${item.price.toFixed(2)}</p>
              </div>
            </div>
          </a>`
        );
      });

    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });
}

filterData()


const itemsSelling = [

  {
    product: 'As Crônicas de Nárnia',
    classification: 5,
    value: 42.41,
    image: '../Frontend/images/Products/livro-narnia.jpg'
  },
  {
    product: 'Vinho DV Catena Cabernet Malbec 750 ml',
    classification: 4,
    value: 95,
    image: '../Frontend/images/Products/vinho.jpg'
  },
  {
    product: 'Copo térmico Everyday Stanley | 296ml',
    classification: 5,
    value: 99.90,
    image: '../Frontend/images/Products/copo-termico.jpg'
  },
  {
    product: 'Baralho Bicycle Fire',
    classification: 5,
    value: 58.41,
    image: '../Frontend/images/Products/baralho.jpg'
  },
  {
    product: 'O Hobbit + pôster',
    classification: 5,
    value: 44.90,
    image: '../Frontend/images/Products/whisky.jpg'
  },
  {
    product: 'Mouse sem fio Logitech M170 com Design Ambidestro Compacto, Conexão USB e Pilha Inclusa - Preto',
    classification: 5,
    value: 54.90,
    image: '../Frontend/images/Products/mouse.jpg'
  },
  {
    product: 'PLACA DE VIDEO GALAX GEFORCE RTX 3060 TI PLUS 1-CLICK OC 8GB GDDR6X - 36ISM6MD2KCV',
    classification: 5,
    value: 3389,
    image: '../Frontend/images/Products/placa-video.jpg'
  },
  {
    product: 'PARAFUSADEIRA PPF03',
    classification: 4,
    value: 208.42,
    image: '../Frontend/images/Products/parafusadeira.jpg'
  },
  {
    product: 'Apollo Tools Kit De Ferramentas Domésticas 135 Peças - Dt0773N1',
    classification: 4,
    value: 352.70,
    image: '../Frontend/images/Products/mala-ferramentas.jpg'
  },
  {
    product: 'SANDALIAS HAVAIANAS SLIM SECRET',
    classification: 4,
    value: 39.90,
    image: '../Frontend/images/Products/havaianas.jpg'
  },
  {
    product: 'Smartphone Xiaomi POCO X5 Pro 5G Dual SIM 8GB 256GB 6,67" FHD+ 108MP 5000mAh 67W Carregamento (Preto)',
    classification: 5,
    value: 2440.49,
    image: '../Frontend/images/Products/smartphone.jpg'
  },
  {
    product: 'Impressora Multifuncional HP DeskJet Ink Advantage 2774 Thermal Inkjet Cor Wi-Fi Scanner (7FR22A)',
    classification: 4,
    value: 350.10,
    image: '../Frontend/images/Products/impressora.jpg'
  },
  {
    product: 'Extrator de Sucos Mondial Turbo Premium E-10 EXTRATOR-BIV-PRETO/INOX',
    classification: 4,
    value: 169.99,
    image: '../Frontend/images/Products/extrator-suco.jpg'
  },
  {
    product: 'Headphone Fone de Ouvido Havit HV-H2002d, Gamer, com Microfone, Falante 53mm, Plug 3.5mm: compatível com XBOX ONE e PS4, HAVIT, HV-H2002d e Outros',
    classification: 5,
    value: 189.99,
    image: '../Frontend/images/Products/headphone.jpg'
  },
  {
    product: 'Whisky Johnnie Walker Red Label 750ml',
    classification: 5,
    value: 59.90,
    image: '../Frontend/images/Products/whisky.jpg'
  },
  {
    product: 'Carrinho Controle Remoto Com Bateria Recarregavel Vira Robo Mega Compras 2244 (AZUL)',
    classification: 3,
    value: 74.90,
    image: '../Frontend/images/Products/carrinho.jpg'
  },
  {
    product: '12 pçs conjunto de cozinha',
    classification: 5,
    value: 68.39,
    image: '../Frontend/images/Products/panelas.jpg'
  },
]



const mostReviwedItens = [
  {
    product: 'PLACA DE VIDEO GALAX GEFORCE RTX 3060 TI PLUS 1-CLICK OC 8GB GDDR6X - 36ISM6MD2KCV',
    classification: 5,
    value: 3389,
    image: '../Frontend/images/Products/placa-video.jpg'
  },
  {
    product: 'PARAFUSADEIRA PPF03',
    classification: 4,
    value: 208.42,
    image: '../Frontend/images/Products/parafusadeira.jpg'
  },
  {
    product: 'Whisky Johnnie Walker Red Label 750ml',
    classification: 5,
    value: 59.90,
    image: '../Frontend/images/Products/whisky.jpg'
  },
  {
    product: 'Vinho DV Catena Cabernet Malbec 750 ml',
    classification: 4,
    value: 95,
    image: '../Frontend/images/Products/vinho.jpg'
  },
  {
    product: 'Copo térmico Everyday Stanley | 296ml',
    classification: 5,
    value: 99.90,
    image: '../Frontend/images/Products/copo-termico.jpg'
  },
]


document.querySelector('.dropdown-toggle').addEventListener('click', function () {
  document.querySelector('.dropdown-menu').classList.toggle('show');
});