// python -m SimpleHTTPServer run in terminal

const myList = document.querySelector('.json_test');
const sortA = document.querySelector('.sort__btn__a');
const sortB = document.querySelector('.sort__btn__b');
const sortC = document.querySelector('.sort__btn__c');
let tileData;

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function galleryGen(tileData) {
    myList.innerHTML = '';
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

        myList.appendChild(listItem);
    }
}


fetch('mock_data.json')
    .then((resp) => resp.json())
    .then(function(json) {
        tileData = json.tiles;
        galleryGen(tileData);

    })

sortA.addEventListener("click", runSortA);
sortB.addEventListener("click", runSortB);
sortC.addEventListener("click", runSortC);

function runSortA(e) {
    tileData.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })

    galleryGen(tileData);
}

function runSortB(e) {
    tileData.sort(function(a, b) {
        return a.price - b.price
    })

    galleryGen(tileData);

}

function runSortC(e) {
    tileData.sort(function(a, b) {
        return a.rating - b.rating
    })

    galleryGen(tileData);

}