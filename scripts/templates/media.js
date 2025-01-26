// media.js

// @ts-nocheck
import { updateTotalLikes } from "../utils/totalLikes.js";

let allMedias = [];

// Déclaration de la classe Media qui représente un média (image ou vidéo) dans la galerie
export class Media {
  // Constructeur de la classe Media
  constructor(data, firstName) {
    // Initialisation des propriétés de l'instance Media avec les données fournies
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.video = data.video;
    this.likes = data.likes;
    this.firstName = firstName; // Nom du photographe pour structurer le chemin des fichiers

    // Ajoutez chaque instance à la liste globale
    allMedias.push(this);
  }

  // Crée l'élément HTML pour le média (image ou vidéo)
  createMediaElement() {
    let mediaElement;
    // Chemin du média en fonction du nom du photographe
    const mediaLink = `./assets/images/${this.firstName}/`;

    // Vérifie si le média est une image
    if (this.image) {
      mediaElement = document.createElement("img");
      console.log("this.firstName", this.firstName); // Débogage : affiche le nom du photographe
      mediaElement.setAttribute("src", `${mediaLink}${this.image}`); // Définit le chemin de l'image
    } else if (this.video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("src", `${mediaLink}${this.video}`); // Définit le chemin de la vidéo
    }

    // Ajoute des classes CSS à l'élément média pour le style
    mediaElement.classList.add("photo-template__photo");
    mediaElement.classList.add("lightbox-link");
    // Définit des attributs pour l'accessibilité et l'identification
    mediaElement.setAttribute("id", this.id);
    mediaElement.setAttribute("alt", this.title);
    mediaElement.setAttribute("aria-label", this.title);
    mediaElement.setAttribute("tabindex", "0");

    return mediaElement; // Retourne l'élément média créé
  }

  // Crée un bouton "Like" pour le média
  createLikeButton(likeContainer, likeCount) {
    const likeButton = document.createElement("button");
    likeButton.classList.add("photo-template__like-button");
    likeButton.setAttribute("aria-label", "Like");
    likeButton.setAttribute("aria-pressed", "false");

    // Variable pour gérer l'état du bouton (liké ou non liké)
    let incrementLike = true;
    likeButton.addEventListener("click", () => {
      if (incrementLike) {
        this.likes += 1; // Incrémente le nombre de likes
        likeButton.setAttribute("aria-pressed", "true"); // Modifie l'attribut aria pour indiquer l'état
        incrementLike = false;
        likeIcon.classList.add("fa-solid");
      } else {
        this.likes -= 1; // Décrémente le nombre de likes
        likeButton.setAttribute("aria-pressed", "false"); // Modifie l'attribut aria pour indiquer l'état
        incrementLike = true;
        likeIcon.classList.add("fa-regular")
        likeIcon.classList.remove("fa-solid");
      }
      likeCount.textContent = this.likes; // Met à jour le nombre de likes affiché
      // Appelle une fonction pour mettre à jour les likes totaux
      updateTotalLikes(allMedias);
    });

    // Crée l'icône de like (cœur)
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("fa-regular", "fa-heart", "photo-template__like-icon");
    likeIcon.setAttribute("aria-label", "Like");

    likeButton.appendChild(likeIcon); // Ajoute l'icône au bouton de like
    likeContainer.appendChild(likeButton); // Ajoute le bouton de like au conteneur de likes
  }

  // Crée le template HTML pour le média (image ou vidéo) avec ses informations associées
  createPhotoTemplate() {
    const photoTemplate = document.createElement("div");
    photoTemplate.classList.add("photo-template");

    const mediaElement = this.createMediaElement(); // Crée l'élément média (image ou vidéo)
    photoTemplate.appendChild(mediaElement); // Ajoute l'élément média au template

    const photoInfo = document.createElement("div");
    photoInfo.classList.add("photo-template__info");

    const photoTitle = document.createElement("span");
    photoTitle.classList.add("photo-template__title");
    photoTitle.textContent = this.title; // Définit le titre du média

    const likeContainer = document.createElement("div");
    likeContainer.classList.add("photo-template__like-container");

    console.log("this.likes", this.likes); // Débogage : affiche le nombre de likes du média
    const likeCount = document.createElement("span");
    likeCount.classList.add("photo-template__like-count");
    likeCount.textContent = this.likes; // Définit le nombre de likes du média
    likeContainer.appendChild(likeCount); // Ajoute le nombre de likes au conteneur de likes
    this.createLikeButton(likeContainer, likeCount); // Crée et ajoute le bouton de like

    photoInfo.appendChild(photoTitle); // Ajoute le titre au conteneur d'informations
    photoInfo.appendChild(likeContainer); // Ajoute le conteneur de likes aux informations
    photoTemplate.appendChild(photoInfo); // Ajoute les informations au template du média

    return photoTemplate; // Retourne le template complet du média
  }
}

export default Media;
