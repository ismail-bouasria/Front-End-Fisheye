'use strict';
// Récupérer les paramètres de l'URL
const params = new URLSearchParams(window.location.search);

// Extraire l'ID et le convertir en int
const photographerId = parseInt(params.get('id'));


async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    return data;
}
    // Récupère les datas des photographes
    const photographers = getPhotographers();

async function photographerTemplateById(data) {
     console.log(data);
     const photographerById = await data.photographers.map((items =>
    {
        console.log(items.id);
    }
    ))
    
    
   
}

photographerTemplateById(photographers);
