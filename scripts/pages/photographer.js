// @ts-nocheck
import { photographerTemplateById} from "../templates/photographerTemplate.js";
import { createForm } from "../templates/contactForm.js";

export class PhotographerPage {
  constructor() {
    // Initialisation des éléments du DOM nécessaires
    this.photographerId = this.getPhotographerIdFromUrl();
    this.photographer = null;
    this.media = null;
  }
  // Méthode pour extraire l'ID de l'URL
  getPhotographerIdFromUrl() {
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    // Extraire l'ID de l'URL
    return urlParams.get("id");
  }

  async getPhotographerById(id) {
    // Récupérer les photographes depuis le localStorage
    let photographers = window.localStorage.getItem("photographers");
    console.log("Photographers récupéré du localStorage :", photographers);

    // Vérifier si les photographes sont déjà stockés dans le localStorage
    if (photographers === null) {
      try {
        // Récupération des données depuis l'API
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Données reçues depuis l'API :", data);

        // Extraire les photographes de la réponse
        photographers = data.photographers;

        // Transformation des données en JSON et stockage pour les photographes
        const valeurPhotographers = JSON.stringify(photographers);
        // Stockage des données dans le localStorage
        window.localStorage.setItem("photographers", valeurPhotographers);
      } catch (error) {
        // Gestion des erreurs
        console.error(
          "Erreur lors de la récupération des données depuis l'API :",
          error
        );
        return null;
      }
    } else {
      // Analyser les données stockées pour obtenir le tableau des photographes
      try {
        // Analyse des données stockées
        photographers = JSON.parse(photographers);
        console.log("Photographers après parsing :", photographers);
      } catch (error) {
        // Gestion des erreurs
        console.error(
          "Erreur lors de l'analyse des données du localStorage :",
          error
        );
        return null;
      }
    }

    // Vérifiez si photographers est bien un tableau
    if (Array.isArray(photographers)) {
      // Filtrer le photographe en fonction de l'ID
      const photographer = photographers.find((p) => p.id == id);
      return photographer;
    } else {
      // Gestion des erreurs
      console.error("Photographers data is not an array:", photographers);
      return null;
    }
  }

  async getMediaByIdPhotographer(id) {
    // Récupérer les medias depuis le localStorage
    let medias = window.localStorage.getItem("medias");
    console.log("Media récupéré du localStorage :", medias);

    // Vérifier si les medias sont déjà stockés dans le localStorage
    if (medias === null) {
      try {
        // Récupération des données depuis l'API
        const response = await fetch("./data/photographers.json");
        if (!response.ok) {
          // Gestion des erreurs
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Récupération des données
        const data = await response.json();
        console.log("Données reçues depuis l'API :", data);

        // Extraire les medias de la réponse
        medias = data.media;

        // Transformation des données en JSON et stockage pour les medias
        const valeurMedias = JSON.stringify(medias);
        // Stockage des données dans le localStorage
        window.localStorage.setItem("medias", valeurMedias);
      } catch (error) {
        // Gestion des erreurs
        console.error(
          "Erreur lors de la récupération des données depuis l'API :",
          error
        );
        return null;
      }
    } else {
      // Analyser les données stockées pour obtenir le tableau des photographes
      try {
        // Analyse des données stockées
        medias = JSON.parse(medias);
        console.log("Medias après parsing :", medias);
      } catch (error) {
        // Gestion des erreurs
        console.error(
          "Erreur lors de l'analyse des données du localStorage :",
          error
        );
        return null;
      }
    }

    // Vérifiez si medias est bien un tableau
    if (Array.isArray(medias)) {
      // Filtrer les médias en fonction de l'ID du photographe
      const media = medias.filter((m) => m.photographerId == id);
      return media;
    } else {
      // Gestion des erreurs
      console.error("Medias data is not an array:", medias);
      return null;
    }
  }

  async displayPhotographerData(photographer, media) {
    // Ici on s'assure que photographer n'est pas undefined
    if (photographer && media) {
      // Création d'une instance de la classe PhotographerModel
      const photographerModel = photographerTemplateById(photographer, media);
      // Appel des méthodes pour afficher les données du photographe
      photographerModel.getUserHeaderDOM();
      photographerModel.getUserSelectDOM();
      photographerModel.getPhotographerGalleryDOM();
      photographerModel.getPhotographerOverlay();

      // Appel de la fonction createForm avec le photographe
      createForm(photographer);
      console.log(
        "createForm a été appelée avec le photographe :",
        photographer
      );
    } else {
      // Gestion des erreurs
      console.error("Photographer ou media non trouvé");
    }
  }

  async init() {
    // Récupère l'ID du photographe depuis l'URL
    this.photographerId = this.getPhotographerIdFromUrl();
    console.log("ID du photographe récupéré de l'URL:", this.photographerId);

    // Récupère les datas du photographe en fonction de son ID
    this.photographer = await this.getPhotographerById(this.photographerId);
    console.log("Photographe trouvé:", this.photographer);

    // Récupère les medias du photographe en fonction de son ID
    this.media = await this.getMediaByIdPhotographer(this.photographerId);
    console.log("Media trouvé:", this.media);

    // Affiche les données du photographe
    this.displayPhotographerData(this.photographer, this.media);
  }
}

// Création d'une instance de la classe PhotographerPage et appel de la méthode init
const photographerPage = new PhotographerPage();
photographerPage.init();
