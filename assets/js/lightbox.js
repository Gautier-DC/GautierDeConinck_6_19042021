/**  
  *@property {HTMLElement} element
  *@property {string[]} images path of the lightbox pictures
  *@property {string} url displayed picture
  */

export default class Lightbox {
  static init() {
    const links = Array.from(document
      .querySelectorAll('a[href$="jpg"], a[href$="jpeg"], a[href$="png"], a[href$="mp4"], a[href$="webm"], a[href$="ogv"]'))
      const gallery = links.map(link => link.getAttribute('href'))
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("href"), gallery);
        });
      });
  }

  /**  
  *@param {string} url Picture's URL
  *@param {string[]} images path of the lightbox pictures
  */
  constructor(url, images) {
    this.element = this.buildDOM(url);
    this.images = images;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /** 
   *@param {string} url Picture's url
  */
  loadImage(url) {
    this.url = null
    const image = new Image();
    const container = this.element.querySelector(".lightbox__container");
    image.onload = () => {
      container.appendChild(image);
      this.url = url
    };
    image.src = url;
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }

  /** 
   *  @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key == "Escape") {
      this.close(e);
    } else if (e.key == "ArrowLeft") {
      this.prev(e);
    } else if (e.key == "ArrowRight") {
      this.next(e);
    }
  }

  /**  
   * Close lightbox
   * @param {MouseEvent/KeyboardEvent} e
  */
  close (e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  /**  
   * @param {MouseEvent/KeyboardEvent} e
  */
  next (e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image == this.url)
    if (i == this.images.lenght - 1) {
      i == -1
    }
    this.loadImage(this.images[i + 1])
  }
  /**  
   * @param {MouseEvent/KeyboardEvent} e
  */
  prev (e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image == this.url)
    if (i == 0) {
      i == this.images.lenght
    }
    this.loadImage(this.images[i - 1])
  }

  /** 
   * @param {string} url Picture's url
   * @return {HTMLElement}
    */
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
      <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
      <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
      <div class="lightbox__container d-flex row">
        <img src="${url}" alt="">
      </div>`;
    dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
    dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
    dom.querySelector(".lightbox__prev").addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

