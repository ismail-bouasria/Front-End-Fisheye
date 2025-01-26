// photographerCard.js

/**
 * Crée une carte de profil pour un photographe et retourne l'élément DOM correspondant.
 * 
 * @param {Object} data - Les données du photographe, incluant le nom, l'ID, le portrait, la ville, le pays, la tagline, et le prix.
 * @returns {HTMLElement} - L'article HTML représentant la carte de profil du photographe.
 */
export function getUserCardDOM(data) {
  const { name, id, portrait, city, country, tagline, price } = data; // Destructure les données du photographe
  const picture = `./assets/photographers/${portrait}`; // Chemin vers l'image du photographe

  // Crée un élément article pour la carte du photographe
  const article = document.createElement("article");
  article.classList.add("photographer_card"); // Ajoute une classe pour le style
  article.setAttribute("tabindex", "0");

  // Crée un lien qui mène à la page du profil du photographe
  const anchor = document.createElement("a");
  anchor.setAttribute("href", `./photographer.html?id=${id}`); // Définit l'URL de destination
  anchor.setAttribute("aria-label", `Voir le profil de ${name}`); // Label pour l'accessibilité
  anchor.setAttribute("role", "link"); // Rôle ARIA pour indiquer que c'est un lien

  // Crée un élément figure pour contenir l'image du photographe
  const figureimg = document.createElement("figure");
  figureimg.classList.add("photographer_card__img"); // Classe pour le style
  figureimg.setAttribute("aria-label", `Portrait de ${name}`); // Label pour l'accessibilité

  // Crée l'image du photographe
  const img = document.createElement("img");
  if (id === 243) {
    img.classList.add("photographer_card__img--ellie"); // Applique une classe spéciale si l'ID est 243
  } else if (id === 82) {
    img.classList.add("photographer_card__img--tracy"); // Applique une classe spéciale si l'ID est 82
  }
  img.setAttribute("src", picture); // Définit le chemin vers l'image
  img.setAttribute("alt", `Portrait de ${name}`); // Texte alternatif pour l'accessibilité
  img.classList.add("photographer_card__img--img"); // Classe pour le style
  figureimg.appendChild(img); // Ajoute l'image au conteneur figure

  // Crée le nom du photographe
  const h2 = document.createElement("h2");
  h2.classList.add("photographer_card__name"); // Classe pour le style
  h2.textContent = name; // Définit le texte du nom
  anchor.appendChild(figureimg); // Ajoute le conteneur figure au lien
  anchor.appendChild(h2); // Ajoute le nom au lien
  article.appendChild(anchor); // Ajoute le lien à l'article

  // Crée l'élément pour la localisation du photographe
  const h3 = document.createElement("h3");
  h3.classList.add("photographer_card__location"); // Classe pour le style
  h3.textContent = `${city}, ${country}`; // Définit le texte de la localisation
  article.appendChild(h3); // Ajoute la localisation à l'article

  // Crée l'élément pour la tagline du photographe
  const p = document.createElement("p");
  p.classList.add("photographer_card__tagline"); // Classe pour le style
  p.textContent = tagline; // Définit le texte de la tagline
  article.appendChild(p); // Ajoute la tagline à l'article

  // Crée l'élément pour le prix du photographe
  const span = document.createElement("span");
  span.classList.add("photographer_card__price"); // Classe pour le style
  span.textContent = `${price}€/jour`; // Définit le texte du prix
  article.appendChild(span); // Ajoute le prix à l'article

  return article; // Retourne l'article complet
}
