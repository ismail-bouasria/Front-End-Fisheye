// @ts-nocheck
// contactForm.js
import { handleSubmit } from "../utils/contactForm.js"; // Importation de la fonction pour gérer la soumission du formulaire
import { removeAccents } from "../utils/accents.js"; // Importation d'une fonction pour nettoyer les accents des caractères

/**
 * Crée et retourne un formulaire de contact dans une fenêtre modale.
 * 
 * @param {Object} data - Données du photographe, incluant le nom utilisé dans l'en-tête du formulaire.
 * @returns {HTMLElement} - Le conteneur de la fenêtre modale contenant le formulaire.
 */
export function createForm(data) {
  console.log("data:", data); // Débogage : affiche les données du photographe

  // Sélectionne la div de la modale et vide son contenu
  const modalDiv = document.querySelector(".modal");
  modalDiv.innerHTML = "";

  // Crée l'en-tête de la modale
  const header = document.createElement("header");
  
  // Crée le titre de la modale avec le nom du photographe
  const h2 = document.createElement("h2");
  h2.innerHTML = "Contactez-moi" + "<br>" + data.name; // Affiche "Contactez-moi" suivi du nom du photographe
  header.appendChild(h2);
  
  // Crée le bouton de fermeture de la modale
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/icons/close.svg"); // Chemin vers l'icône de fermeture
  img.setAttribute("onclick", "closeModal()"); // Fonction JavaScript pour fermer la modale
  img.setAttribute("alt", "Fermer le formulaire de contact"); // Texte alternatif pour l'accessibilité
  img.setAttribute("aria-label", "Fermer le formulaire de contact"); // Label pour l'accessibilité
  header.appendChild(img); // Ajoute l'icône de fermeture à l'en-tête
  
  // Ajoute l'en-tête au conteneur de la modale
  modalDiv.appendChild(header);

  // Crée le formulaire de contact
  const form = document.createElement("form");
  form.setAttribute("id", "contact_form"); // ID du formulaire pour le ciblage
  form.addEventListener("submit", handleSubmit); // Ajoute un gestionnaire pour la soumission du formulaire
  form.setAttribute("aria-labelledby", "contactez-moi"); // Label pour l'accessibilité
  
  // Crée un conteneur pour les éléments du formulaire
  const div = document.createElement("div");

  // Définit les labels pour les champs du formulaire
  const labels = ["Prénom", "Nom", "Email", "Votre message"];
  labels.forEach((labelText) => {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("input_container"); // Ajoute une classe pour le style des champs

    // Crée l'étiquette pour le champ
    const label = document.createElement("label");
    const id = removeAccents(labelText); // Nettoie les accents du texte de l'étiquette
    label.innerHTML = labelText; // Définit le texte de l'étiquette
    label.setAttribute("for", id); // Attribut "for" pour associer l'étiquette au champ correspondant
    label.classList.add("contact_label"); // Ajoute une classe pour le style de l'étiquette
    containerDiv.appendChild(label); // Ajoute l'étiquette au conteneur du champ

    // Crée le champ de saisie en fonction du type d'étiquette
    if (labelText === "Votre message") {
      // Crée une zone de texte pour le message
      const textarea = document.createElement("textarea");
      textarea.setAttribute("name", id); // Définit le nom du champ
      textarea.setAttribute("id", id); // Définit l'ID du champ
      textarea.setAttribute("aria-label", "Entrez votre message ici"); // Label pour l'accessibilité
      textarea.setAttribute("aria-required", "true"); // Indique que le champ est requis
      textarea.setAttribute("rows", "5"); // Définit le nombre de lignes visibles
      textarea.setAttribute("cols", "33"); // Définit le nombre de colonnes visibles
      containerDiv.appendChild(textarea); // Ajoute la zone de texte au conteneur du champ
    } else {
      // Crée un champ de saisie pour le prénom, le nom ou l'email
      const input = document.createElement("input");
      input.setAttribute("type", labelText === "Email" ? "email" : "text"); // Définit le type du champ (email ou texte)
      input.setAttribute("name", id); // Définit le nom du champ
      input.setAttribute("id", id); // Définit l'ID du champ
      input.setAttribute("aria-required", "true"); // Indique que le champ est requis
      input.setAttribute("aria-label", `Entrez votre ${labelText.toLowerCase()}`); // Label pour l'accessibilité
      containerDiv.appendChild(input); // Ajoute le champ de saisie au conteneur du champ
    }

    div.appendChild(containerDiv); // Ajoute le conteneur du champ au div principal du formulaire
  });

  // Ajoute le div contenant les champs de saisie au formulaire
  form.appendChild(div);

  // Crée et ajoute le bouton de soumission
  const button = document.createElement("button");
  button.classList.add("contact_button"); // Ajoute une classe pour le style du bouton
  button.setAttribute("type", "submit"); // Définit le type du bouton comme "submit"
  button.setAttribute("id", "sendButton"); // ID du bouton pour le ciblage
  button.innerHTML = "Envoyer"; // Texte du bouton
  button.setAttribute("aria-label", "Envoyer le formulaire de contact"); // Label pour l'accessibilité
  form.appendChild(button); // Ajoute le bouton au formulaire

  // Ajoute le formulaire au conteneur de la modale
  modalDiv.appendChild(form);

  return modalDiv; // Retourne le conteneur de la modale avec le formulaire
}

// Expose la fonction createForm globalement pour qu'elle soit accessible depuis d'autres scripts
window.createForm = createForm;
