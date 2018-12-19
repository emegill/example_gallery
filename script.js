// python -m SimpleHTTPServer run in terminal

const galleryContainer = document.querySelector('.gallery__container');
const sortTitleBtn = document.querySelector('.sort__btn__title');
const sortPriceBtn = document.querySelector('.sort__btn__price');
const sortRatingBtn = document.querySelector('.sort__btn__rating');
let modal = document.querySelector(".modal");
let modalContents = document.querySelector(".modal__content")
let closeButton = document.querySelector(".modal__close__btn");
let tileJsonData;

function bindEventListeners() {
    sortTitleBtn.addEventListener("click", runSortTitle);
    sortPriceBtn.addEventListener("click", runSortPrice);
    sortRatingBtn.addEventListener("click", runSortRating);
    closeButton.addEventListener("click", toggleModal);
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// -------- gallery generation using Json data -------- 

function generateGalleryMarkup(tileJsonData) {
    galleryContainer.innerHTML = '';

    for (let i = 0; i < tileJsonData.length; i++) {
        const tile = tileJsonData[i];

        let listItem = createNode('li');
        let img = createNode('img');
        let name = createNode('p');
        let price = createNode('p');
        let rating = createNode('p');

        img.src = tile.image;
        name.innerHTML = 'Title: ' + tile.name;
        price.innerHTML = 'Price: ' + '$' + tile.price;
        rating.innerHTML = 'Rating: ' + tile.rating;
        listItem.classList.add("w3-col", "w3-row-padding", "s6", "m6", "l4", "gallery__tile");

        listItem.setAttribute('data-slug', tile.slug)
        listItem.addEventListener("click", toggleModal);

        append(listItem, img);
        append(listItem, name);
        append(listItem, price);
        append(listItem, rating);

        galleryContainer.appendChild(listItem);
    }
}

// -------- Sort btn functions -------- 

function runSortTitle(e) {
    tileJsonData.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })

    generateGalleryMarkup(tileJsonData);
}

function runSortPrice(e) {
    tileJsonData.sort(function(a, b) {
        return a.price - b.price
    })

    generateGalleryMarkup(tileJsonData);
}

function runSortRating(e) {
    tileJsonData.sort(function(a, b) {
        return a.rating - b.rating
    })

    generateGalleryMarkup(tileJsonData);
}

// -------- modal generation -------- 

function generateGalleryModal(tileDetails) {
    let img = createNode('img');
    let description = createNode('p');

    modalContents.innerHTML = '';
    img.src = tileDetails.image;
    img.classList.add("modal__img")
    description.classList.add("modal__description")
    description.innerHTML = tileDetails.description;

    append(modalContents, img);
    append(modalContents, description);
}

function toggleModal(e) {
    const modalIsOpen = modal.classList.contains('modal__show');

    if (modalIsOpen) {
        modalContents.innerHTML = '';
    } else {
        const currentTarget = e.currentTarget;
        const slug = currentTarget.getAttribute('data-slug');
        const tileDetails = tileJsonData.find(function(tile) {
            return tile.slug === slug;
        });

        generateGalleryModal(tileDetails);
    }

    modal.classList.toggle("modal__show");
}

// -------- esc function for exiting modal -------- 

document.addEventListener('keyup', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.key || event.keyCode;

    if (key === 'Escape' || key === 'Esc' || key === 27) {
        toggleModal();
    }
});

// -------- Json fetch -------- 

fetch('mock_data.json')
    .then((resp) => resp.json())
    .then(function(json) {
        tileJsonData = json.tiles;
        generateGalleryMarkup(tileJsonData);
    });

window.onload = function() {
    bindEventListeners();
}