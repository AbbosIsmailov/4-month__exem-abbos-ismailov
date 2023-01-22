async function httpGet(url) {
      try {
            let response = await fetch(`http://188.225.31.249:3001/parrots`)
            let result = await response.json();
            return result;
      } catch (error) {
            console.log('error chiqdi');
      }
}

let addBtn = document.getElementById("add-btn")
let formAdd = document.getElementById("form-add")
let rowParrots = document.getElementsByClassName("row-parrots")[0];

function parrotsRender(parrotsList) {
      rowParrots.innerHTML = ""
      let fragment = new DocumentFragment();
      parrotsList.forEach((element, index) => {
            let parrotsTemplate = document.getElementById("parrots-template").cloneNode(true).content;
            let editParrot = parrotsTemplate.querySelector('.fa-pencil');
            let cardFeatures = parrotsTemplate.getElementById("card-features")

            let removeParrot = parrotsTemplate.querySelector('.fa-trash');
            // let favouriteParrot = parrotsTemplate.querySelector('.fa-star');
            let cardImgTop = parrotsTemplate.querySelector('.card-img-top');
            cardImgTop.src = element.img;

            let cardTitle = parrotsTemplate.querySelector('.card-title');
            cardTitle.innerHTML = element.title;

            let cardText = parrotsTemplate.querySelector(".card-text");
            let priceParrot = document.createElement("span");
            priceParrot.innerHTML = `$${element.price}`;
            priceParrot.classList.add("bage", "price-parrot")

            let sizeParrot = document.createElement("span");
            sizeParrot.innerHTML = `${element.sizes.height}sm x ${element.sizes.width}sm`;
            sizeParrot.classList.add("bage", "text-bg-success", "rounded-1", "size-width");

            let birthDateParrot = document.createElement("span");
            birthDateParrot.innerHTML = element.birthDate;

            cardFeatures.innerHTML = element.features;
            editParrot.onclick = () => {
                  setFormValues(element);
            }

            removeParrot.onclick = (e) => {
                  httpDelete(`http://188.225.31.249:3001/parrots/${element.id}`)
            }


            cardText.append(priceParrot, sizeParrot, birthDateParrot);
            fragment.append(parrotsTemplate)

      })
      rowParrots.append(fragment);
};






let addTitleInput = document.getElementById("add-title-input");
let addPriceInput = document.getElementById("add-price-input");
let addImgInput = document.getElementById("add-img-input");
let addSizeHeightInput = document.getElementById("add-size-height-input");
let addSizeWidthInput = document.getElementById("add-size-width-input");
let addBirthDateInput = document.getElementById("add-birth-date-input");
let addFeaturesInput = document.getElementById("add-features-input");
let id

function setFormValues(formData) {
      addTitleInput.value = formData.title;
      addPriceInput.value = +formData.price;
      addImgInput.value = formData.img;
      addSizeHeightInput.value = formData.sizes.height;
      addSizeWidthInput.value = formData.sizes.width;
      addBirthDateInput.value = formData.birthDate;
      addFeaturesInput.value = formData.features;
      id = formData.id;
}

formAdd.addEventListener("submit", (e) => {
      e.preventDefault()
      const url = `http://188.225.31.249:3001/parrots/${id}`
      const newFormData = {
            "title": addTitleInput.value,
            "img": addImgInput.value,
            "price": +addPriceInput.value,
            "birthDate": addBirthDateInput.value,
            "sizes": {
                  "width": addSizeWidthInput.value,
                  "height": addSizeHeightInput.value,
            },
            "isFavorite": false,
            "features": addFeaturesInput.value,
      }
      httpPut(url, newFormData, 'PUT').then(function () {
            httpGet().then((parrotsList) => {
                  parrotsRender(parrotsList);
            })
      });
})

async function httpDelete(url) {
      fetch(url, {
            method: 'DELETE',
      }).then(function () {
            httpGet().then((parrotsList) => {
                  parrotsRender(parrotsList);
            })
      })
}


async function httpPut(url, data = {}, method) {
      const response = await fetch(url, {
            method: method,
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
      })
      return response;
}


//////////// toti qoshish
let titleInput = document.getElementById("title-input");
let priceInput = document.getElementById("price-input");
let imgInput = document.getElementById("img-input");
let sizeHeightInput = document.getElementById("size-height-input");
let sizeWidthInput = document.getElementById("size-width-input");
let birthDateInput = document.getElementById("birth-date-input");
let featuresInput = document.getElementById("features-input");

let saveNewParrot = document.getElementById("save-new-parrot");
let newParrotForm = document.getElementById("new-parrot-form");
newParrotForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const url = `http://188.225.31.249:3001/parrots`
      const newFormData = {
            "title": titleInput.value,
            "img": imgInput.value,
            "price": +priceInput.value,
            "birthDate": birthDateInput.value,
            "sizes": {
                  "width": sizeWidthInput.value,
                  "height": sizeHeightInput.value,
            },
            "isFavorite": false,
            "features": featuresInput.value,
      }
      httpPut(url, newFormData, 'POST').then(function () {
            httpGet().then((parrotsList) => {
                  parrotsRender(parrotsList);
            })
      });
})
///////////////////////////////////////////


let filterForm = document.getElementById("filter-form");
filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let searchInput = document.getElementById("search-input");
      let priceFromInput = document.getElementById("price-from-input")
      let widthFromInput = document.getElementById("width-from-input")
      let priceToInput = document.getElementById("price-to-input")

      fetch(`http://188.225.31.249:3001/parrots?q=${searchInput.value}&price_gte=${priceFromInput.value}&price_lte=${priceToInput.value}`).then((parrotsList) => {
            parrotsList.json().then(parrotsList => {
                  parrotsRender(parrotsList);
            })
      });
})






httpGet().then((parrotsList) => {
      parrotsRender(parrotsList);
})