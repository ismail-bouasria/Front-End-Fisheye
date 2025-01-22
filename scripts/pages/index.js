// @ts-nocheck
import { photographerTemplate } from "../templates/photographerTemplate.js";

async function getPhotographers() {
  // Récupérer les photographes depuis le localStorage
  let photographers = window.localStorage.getItem("photographers");
  // Vérifier si les photographes sont déjà stockés dans le localStorage
  if (photographers === null) {
    try {
      // Récupération des données depuis l'API
      const response = await fetch("./data/photographers.json");
      if (!response.ok) {
        // Gestion des erreurs
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Récupération des données
      const data = await response.json();
      // Extraire les photographes de la réponse
      photographers = data.photographers;
      // Transformation des données en JSON
      const valeurPhotographers = JSON.stringify(photographers);
      // Stockage des informations dans le localStorage sous la clé "photographers"
      window.localStorage.setItem("photographers", valeurPhotographers);
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la récupération des photographes:", error);
      return { photographers: [] }; // Retourne un tableau vide en cas d'erreur
    }
  } else {
    // Analyser les données stockées pour obtenir le tableau des photographes
    photographers = JSON.parse(photographers);
  }
  return { photographers };
}

// Modèle de la carte utilisateur
async function displayData(data) {
  console.log("Data:", data);
  // Vérifier si les données sont correctes
  if (!data || !data.photographers) {
    // Gestion des erreurs
    console.error("Data format is incorrect:", data);
    return;
  }

  // Récupérer la section des photographes
  const photographersSection = document.querySelector(".photographer_section");
  // Vérifier si la section existe
  data.photographers.forEach((photographer) => {
    // Créer une carte utilisateur pour chaque photographe
    const photographerModel = photographerTemplate(photographer);
    // Récupérer le DOM de la carte utilisateur
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajouter la carte utilisateur à la section des photographes
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const data = await getPhotographers();
  // Affiche les données
  displayData(data);
}

init();
