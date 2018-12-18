// python -m SimpleHTTPServer run in terminal

const galleryContainer = document.querySelector('.gallery-container');
const sortTitleBtn = document.querySelector('.sort__btn__title');
const sortPriceBtn = document.querySelector('.sort__btn__price');
const sortRatingBtn = document.querySelector('.sort__btn__rating');
let tileData;

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function generateGalleryMarkup(tileData) {
    galleryContainer.innerHTML = '';
    
    for (let i = 0; i < tileData.length; i++) {
        const tile = tileData[i];

        let listItem = createNode('li');
        let img = createNode('img');
        let name = createNode('p');
        let price = createNode('p');
        let rating = createNode('p');

        img.src = tile.image;
        name.innerHTML = 'Title: ' + tile.name;
        price.innerHTML = 'Price: ' + '$' + tile.price;
        rating.innerHTML = 'Rating: ' + tile.rating;
        listItem.classList.add("w3-col", "w3-row-padding", "s12", "m6", "l4", "gallery__tile");

        append(listItem, img);
        append(listItem, name);
        append(listItem, price);
        append(listItem, rating);

        galleryContainer.appendChild(listItem);
    }
}


fetch('mock_data.json')
    .then((resp) => resp.json())
    .then(function(json) {
        tileData = json.tiles;
        generateGalleryMarkup(tileData);

    })

sortTitleBtn.addEventListener("click", runSortTitle);
sortPriceBtn.addEventListener("click", runSortPrice);
sortRatingBtn.addEventListener("click", runSortRating);

function runSortTitle(e) {
    tileData.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })

    generateGalleryMarkup(tileData);
}

function runSortPrice(e) {
    tileData.sort(function(a, b) {
        return a.price - b.price
    })

    generateGalleryMarkup(tileData);

}

function runSortRating(e) {
    tileData.sort(function(a, b) {
        return a.rating - b.rating
    })

    generateGalleryMarkup(tileData);

}