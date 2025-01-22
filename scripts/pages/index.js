async function getPhotographers() {
        // Récupérer les données depuis le fichier JSON
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        // Retourner les données
        return data;
       
}
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();

    // Appeler la fonction pour afficher les photographes
    displayData(photographers);
}

// Initialisation de l'application
init();

function photographerTemplate(data) {
    const { id, name, tagline, city, country, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?id=${id}`);
        link.setAttribute('aria-label', `Voir la page de ${name}`);

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container'

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.className = 'photographer-location';

        const tagLine = document.createElement('p');
        tagLine.textContent = tagline;
        tagLine.className = 'photographer-tagline';

        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        priceElement.className = 'photographer-price';

        article.appendChild(link);
        link.appendChild(imgContainer);
        imgContainer.appendChild(img);
        link.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tagLine);
        article.appendChild(priceElement);

        return article;
    }

    return { id, name, getUserCardDOM };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // Utilisez la fonction de template pour créer les éléments DOM
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

