// @ts-nocheck
  
  // Fonction pour mettre à jour la somme des likes
  export function updateTotalLikes(medias) {
    // Calculer le nombre total de likes
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
    // Sélectionner le conteneur du nombre total de likes
    const overlayLikeCount = document.querySelector(
      ".photograph-overlay__like-count"
    );
    // Mettre à jour le nombre total de likes
    overlayLikeCount.textContent = totalLikes;
  }