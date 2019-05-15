createNode = (element) => {
    return document.createElement(element);
}

append = (parent, el) => {
    return parent.appendChild(el);
}
const url = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

fetch(url)
    .then(res => res.json())
    .then((data) => {
        const response = data.feed.entry;
        console.log(response)
        const albumContainer = document.querySelector('.albums');
        const mainUl = createNode('ul');
        mainUl.setAttribute('class','albums__container')
        albumContainer.append(mainUl);
        
        [...response].forEach(el => {
            const title = createNode('p');
            const category = createNode('p');
            const artist = createNode('h2');
            const albumImage = createNode('img');
            albumImage.setAttribute('src',el['im:image'][2].label);
            const albumLink = createNode('a');
            const ulItems = createNode('div');
            ulItems.setAttribute('class','albums__attributes')
            
            title.setAttribute('class','albums__attributes--title');
            category.setAttribute('class','albums__attributes--category');
            artist.setAttribute('class','albums__attributes--artist');
            albumImage.setAttribute('class','albums__container--album--image');
            albumLink.setAttribute('class','albums__attributes--albumLink');
            albumLink.setAttribute('href',el.link.attributes.href);
            albumLink.setAttribute('target','_blank');
            
            albumLink.textContent = 'Listen me!';
            artist.textContent = el['im:artist'].label;
            category.textContent = 'Category: ' + el.category.attributes.label;
            title.textContent = el['im:name'].label;

            let liElement = createNode('li');
            liElement.setAttribute('class','albums__container--album')
            mainUl.append(liElement);
            liElement.append(albumImage);
            liElement.append(ulItems)
            ulItems.append(artist);
            ulItems.append(title);
            ulItems.append(category);
            ulItems.append(albumLink);
        });
    })

    .catch((error) =>{
        
        console.log('erro:', error);

    });