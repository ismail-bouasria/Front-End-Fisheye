// @ts-nocheck

// photographerProfile.js

import { Media } from '../templates/media.js';
import { updateTotalLikes } from "../utils/totalLikes.js";
import { Lightbox } from "../utils/lightbox.js";

/**
 * Crée et retourne l'en-tête de profil du photographe.
 * 
 * @param {Object} data - Les données du photographe, incluant le nom, l'ID, le portrait, la ville, le pays, et la tagline.
 * @returns {Object} - Contient l'en-tête HTML et le prénom du photographe.
 */
export function getUserHeaderDOM(data) {
  const { name, id, portrait, city, country, tagline } = data; // Destructure les données du photographe
  const picture = `./assets/photographers/${portrait}`; // Chemin vers l'image du portrait du photographe
  const firstName = name.split(" ")[0]; // Extrait le prénom du nom complet

  // Sélectionne l'élément HTML pour l'en-tête du photographe
  const header = document.querySelector(".photograph-header");
  header.innerHTML = ""; // Vide le contenu existant de l'en-tête

  // Crée un conteneur pour les informations du photographe
  const photographerInfo = document.createElement("div");
  photographerInfo.classList.add("photographer_info"); // Classe pour le style

  // Crée et ajoute le nom du photographe
  const h1 = document.createElement("h1");
  h1.textContent = name;
  photographerInfo.appendChild(h1);

  // Crée et ajoute la localisation du photographe
  const location = document.createElement("p");
  location.classList.add("photographer_location"); // Classe pour le style
  location.textContent = `${city}, ${country}`;
  photographerInfo.appendChild(location);

  // Crée et ajoute la tagline du photographe
  const taglineElem = document.createElement("p");
  taglineElem.classList.add("photographer_tagline"); // Classe pour le style
  taglineElem.setAttribute("aria-label", `Tagline du photographe : ${tagline}`); // Label pour l'accessibilité
  taglineElem.textContent = tagline;
  photographerInfo.appendChild(taglineElem);

  // Crée un conteneur pour l'image du photographe
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("photographer_img_container"); // Classe pour le style

  // Crée et ajoute l'image du photographe
  const img = document.createElement("img");
  img.setAttribute("src", picture); // Chemin vers l'image
  img.setAttribute("alt", `Portrait de ${name}`); // Texte alternatif pour l'accessibilité
  img.setAttribute("aria-label", `Portrait de ${name}`); // Label pour l'accessibilité
  img.classList.add("photographer_portrait"); // Classe pour le style
  // Ajoute des classes conditionnelles en fonction de l'ID du photographe
  if (id === 243) {
    img.classList.add("photographer_portrait--ellie");
  } else if (id === 82) {
    img.classList.add("photographer_portrait--tracy");
  }
  imgContainer.appendChild(img);

  // Crée et ajoute le bouton de contact
  const contactButton = document.createElement("button");
  contactButton.classList.add("contact_button"); // Classe pour le style
  contactButton.textContent = "Contactez-moi";
  contactButton.setAttribute("onclick", "displayModal()"); // Ajoute un événement pour afficher le modal

  // Ajoute les éléments au header
  header.appendChild(photographerInfo);
  header.appendChild(contactButton);
  header.appendChild(imgContainer);

  return { header, firstName }; // Retourne l'en-tête et le prénom du photographe
}

/**
 * Crée et configure le sélecteur de tri des médias.
 * 
 * @param {Array} medias - La liste des médias du photographe.
 * @param {string} firstName - Le prénom du photographe, utilisé pour la personnalisation du contenu.
 */
export  async function getUserSelectDOM(medias, firstName) {
  const select = document.querySelector(".photograph-select");
  select.innerHTML = ""; // Vide le contenu existant du sélecteur

  // Crée et ajoute le label pour le sélecteur
  const label = document.createElement("label");
  label.setAttribute("for", "filter");
  label.textContent = "Trier par";
  select.appendChild(label);

  // Crée le sélecteur de tri
  const photographerSelect = document.createElement("div");
  photographerSelect.classList.add("photographer_select");
  photographerSelect.setAttribute("id", "filter");
  photographerSelect.setAttribute("role", "listbox");

  // Élément affichant l'option sélectionnée
  const optionSelected = document.createElement("div");
  optionSelected.classList.add("selected-option");
  optionSelected.textContent = "Popularité"; // Valeur par défaut
  optionSelected.setAttribute("data-selected", "popularite");

  // Conteneur des options
  const divOptions = document.createElement("div");
  divOptions.classList.add("options");
  divOptions.classList.add("claused-options");

  // Crée les options pour le sélecteur de tri
  const options = [
    { id: "popularite", value: "popularite", text: "Popularité" },
    { id: "date", value: "date", text: "Date" },
    { id: "titre", value: "titre", text: "Titre" },
  ];

  options.forEach(optionData => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.setAttribute("data-value", optionData.value);
    option.textContent = optionData.text;

    // Gère le clic sur une option
    option.addEventListener("click", function () {
      optionSelected.textContent = this.textContent;
      optionSelected.setAttribute("data-selected", this.getAttribute("data-value"));
      divOptions.classList.remove("open");

      // Met à jour le tri des médias
      sortMedias(medias, this.getAttribute("data-value"));
      getPhotographerGalleryDOM(medias, firstName);
      Lightbox.init();
    });

    divOptions.appendChild(option);
  });

  function toggleArrow(element) {
    const arrow = element.querySelector('::after');
    const currentContent = window.getComputedStyle(element, '::after').getPropertyValue('content');
    
    // Change le contenu du ::after
    element.style.setProperty('content', currentContent === '"⌄"' ? '"^"' : '"⌄"');
    console.log(currentContent);
  }
   toggleArrow(photographerSelect);
  // Ajoute les éléments dans le sélecteur personnalisé
  photographerSelect.appendChild(optionSelected);
  photographerSelect.appendChild(divOptions);
  select.appendChild(photographerSelect);

  // Gérer l'ouverture/fermeture du select
  optionSelected.addEventListener("click", function () {
    divOptions.classList.toggle("claused-options");
  });

  // Fermer le select lorsqu'une option est choisie
divOptions.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", function () {
    divOptions.classList.add("claused-options"); // Cache les options
  });
});


  // Fermer le select si on clique en dehors
  document.addEventListener("click", function (event) {
    if (!photographerSelect.contains(event.target)) {
      divOptions.classList.add("claused-options");
    }
  });
}

/**
 * Trie les médias en fonction de la valeur sélectionnée
 * @param {Array} medias - Liste des médias
 * @param {string} sortValue - Critère de tri ("popularite", "date", "titre")
 */
function sortMedias(medias, sortValue) {
  if (sortValue === "popularite") {
    medias.sort((a, b) => b.likes - a.likes);
  } else if (sortValue === "date") {
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortValue === "titre") {
    medias.sort((a, b) => a.title.localeCompare(b.title));
  }
}

/**
 * Crée et retourne la galerie des médias du photographe.
 * 
 * @param {Array} medias - La liste des médias du photographe.
 * @param {string} firstName - Le prénom du photographe, utilisé pour créer les instances de Media.
 */
export function getPhotographerGalleryDOM(medias, firstName) {
  const gallery = document.querySelector(".photograph-gallery");
  gallery.innerHTML = ""; // Vide le contenu existant de la galerie

  // Crée un conteneur pour la galerie
  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("photograph-gallery__container"); // Classe pour le style

  // Crée et ajoute les éléments de la galerie
  medias.forEach(mediaData => {
    console.log("mediaData:", mediaData); // Affiche les données du média dans la console
    const media = new Media(mediaData, firstName); // Crée une instance de Media
    const photoTemplate = media.createPhotoTemplate(); // Crée le modèle de photo
    galleryContainer.appendChild(photoTemplate); // Ajoute le modèle de photo au conteneur
  });

  gallery.appendChild(galleryContainer); // Ajoute le conteneur à la galerie
}

/**
 * Crée et retourne la superposition d'informations du photographe.
 * 
 * @param {Array} medias - La liste des médias du photographe.
 * @param {number} price - Le prix du photographe par jour.
 * @returns {HTMLElement} - L'élément HTML de la superposition.
 */
export function getPhotographerOverlay(medias, price) {
  const overlay = document.querySelector(".photograph-overlay");
  overlay.innerHTML = ""; // Vide le contenu existant de la superposition

  // Crée un conteneur pour les likes
  const overlayLike = document.createElement("div");
  overlayLike.classList.add("photograph-overlay__like"); // Classe pour le style

  // Crée et ajoute le compteur de likes
  const overlayLikeCount = document.createElement("p");
  overlayLikeCount.classList.add("photograph-overlay__like-count"); // Classe pour le style

  // Crée et ajoute l'icône de like
  const overlayLikeIcon = document.createElement("i");
  overlayLikeIcon.classList.add("fa-solid", "fa-heart", "photograph-overlay__like-icon"); // Classes pour le style
  overlayLikeIcon.setAttribute("aria-hidden", "true"); // Masque l'icône pour les lecteurs d'écran
  overlayLikeIcon.setAttribute("aria-label", "Like"); // Label pour l'accessibilité

  // Crée et ajoute le prix
  const overlayPrice = document.createElement("p");
  overlayPrice.classList.add("photograph-overlay__price"); // Classe pour le style
  overlayPrice.textContent = `${price}€/jour`; // Définit le texte du prix

  overlayLike.appendChild(overlayLikeCount); // Ajoute le compteur de likes au conteneur
  overlayLike.appendChild(overlayLikeIcon); // Ajoute l'icône de like au conteneur
  overlay.appendChild(overlayLike); // Ajoute le conteneur de likes à la superposition
  overlay.appendChild(overlayPrice); // Ajoute le prix à la superposition

  updateTotalLikes(medias); // Met à jour le nombre total de likes

  return overlay; // Retourne l'élément de la superposition
}
