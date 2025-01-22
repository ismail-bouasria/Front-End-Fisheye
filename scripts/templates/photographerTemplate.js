
// photographerTemplate.js
import { getUserCardDOM } from './photographerCard.js';
import { getUserHeaderDOM, getUserSelectDOM, getPhotographerGalleryDOM, getPhotographerOverlay } from './photographerProfile.js';

export function photographerTemplate(data) {
  return { name: data.name, picture: `./assets/photographers/${data.portrait}`, getUserCardDOM: () => getUserCardDOM(data) };
}

export function photographerTemplateById(data, medias) {
  console.log("data:", data);
  // Extraction du prénom du photographe à partir de son nom complet
  const firstName = data.name.split(" ")[0]
  return {
    name: data.name,
    firstName,
    picture: `./assets/photographers/${data.portrait}`,
    getUserHeaderDOM: () => getUserHeaderDOM(data),
    getUserSelectDOM: () => getUserSelectDOM(medias, firstName),
    getPhotographerGalleryDOM: () => getPhotographerGalleryDOM(medias, firstName),
    getPhotographerOverlay: () => getPhotographerOverlay(medias, data.price),
  };
}
