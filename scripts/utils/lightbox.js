// @ts-nocheck

/**
 * @property {HTMLElement} element
 * @property {string[]} images Liste des media des images de la galerie
 * @property {string} src src de l'image actuellement affichée
 *
 */
export class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll(".lightbox-link"));
    const gallery = links.map((media) => {
      const src = media.getAttribute("src");
      console.log(`src extrait : ${src}`); // Ajout d'un log pour vérifier les srcs
      const title = media.getAttribute("aria-label");
      console.log(`title extrait : ${title}`); // Ajout d'un log pour vérifier les titles
      return { src, title };
    });
    console.log("gallery : ", gallery);
    links.forEach((media) => {
      media.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("src"), gallery);
      });
      media.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("src"), gallery);
        }
      });
    });
  }

  /**
   * @param {string} mediaSrc src de l'image à afficher
   * @param {Array<{src: string, title: string}>} gallery Liste des médias de la galerie
   */
  constructor(mediaSrc, gallery) {
    this.gallery = gallery;
    this.element = this.buildDOM(mediaSrc);
    this.loadMedia(mediaSrc);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);

    // Mettre le focus sur le bouton de fermeture une fois la lightbox ajoutée au DOM
    const closeButton = this.element.querySelector(".lightbox__close");
    closeButton.focus();

    document.addEventListener("keyup", this.onKeyUp);
  }

  /**
   * @param {string} mediaSrc src de l'image à afficher
   */
  loadMedia(mediaSrc) {
    this.media = null;
    const container = this.element.querySelector(".lightbox__media");
    const loader = document.createElement("div");
    loader.classList.add("lightbox__loader");
    container.innerHTML = "";
    container?.appendChild(loader);

    // Déterminer si le média est une image ou une vidéo
    const isImage = mediaSrc.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    const isVideo = mediaSrc.match(/\.(mp4|webm|ogg)$/) !== null;

    // Trouver le titre correspondant au média
    const media = this.gallery.find((item) => item.src === mediaSrc);
    const title = media ? media.title : "";

    // Mettre à jour le titre de la lightbox
    const titleElement = this.element.querySelector(".lightbox__title");
    titleElement.textContent = title;

    if (isImage) {
      const image = new Image();
      image.onload = () => {
        container?.removeChild(loader);
        container?.appendChild(image);
        this.media = mediaSrc;
      };
      image.src = mediaSrc;
    } else if (isVideo) {
      const video = document.createElement("video");
      video.controls = true;
      video.onloadeddata = () => {
        container.removeChild(loader);
        container.appendChild(video);
        this.media = mediaSrc;
      };
      video.src = mediaSrc;
      video.load();
    } else {
      console.error("Type de média non pris en charge :", mediaSrc);
      container?.removeChild(loader);
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === " ") {
      // Gestion de la barre d'espace
      e.preventDefault();
      const container = this.element.querySelector(".lightbox__media");
      const video = container.querySelector("video");
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent} e
   */
  close(e) {
    e.preventDefault();
    this.element.style.display = "none";
    document.body.classList.remove("no-scroll");
    window.setTimeout(() => {
      this.element.remove();
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**
   * Affiche l'image suivante
   * @param {MouseEvent} e
   */
  next(e) {
    e.preventDefault();
    let index = this.gallery.findIndex((item) => item.src === this.media);
    if (index === this.gallery.length - 1) {
      index = -1;
    }
    this.loadMedia(this.gallery[index + 1].src);
  }

  /**
   * Affiche l'image précédente
   * @param {MouseEvent} e
   */
  prev(e) {
    e.preventDefault();
    let index = this.gallery.findIndex((item) => item.src === this.media);
    if (index === 0) {
      index = this.gallery.length;
    }
    this.loadMedia(this.gallery[index - 1].src);
  }

  /**
   * @return {HTMLElement}
   */
  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.setAttribute("role", "dialog");
    dom.setAttribute("aria-modal", "true");
    dom.setAttribute("aria-label", "Image en plein écran");
    // dom.style.display = "block";
    document.body.classList.add("no-scroll");
    //aria-live="polite" indique que le contenu est dynamique (peu changé) et doit être annoncé par un lecteur d'écran
    dom.innerHTML = `
      <button class="lightbox__close" aria-label="Fermer la lightbox" tabindex="0"></button>
      <button class="lightbox__prev" aria-label="Image précédente" tabindex="0"></button>
      <div class="lightbox__content">
      <figure class="lightbox__media" role="document"></figure>
      <h3 class="lightbox__title" aria-live="polite"></h3>
      </div> 
      <button class="lightbox__next" aria-label="Image suivante" tabindex="0"></button>
    `;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Lightbox.init();
});
