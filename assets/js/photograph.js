function showPhotographerProfil() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log('Bonjour', idParam);
  fetch("/FishEyeDataFR.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {      
      let filteredPhotographer = data.photographers;
      if (idParam) {
        filteredPhotographer = filteredPhotographer.find( photographer => photographer.id == idParam);
      }
      setProfilHTML(filteredPhotographer);
      let filteredMedia = data.media;
      console.log('hey' , filteredMedia)
      if (idParam) {
        filteredMedia = filteredMedia.filter( media => media.photographerId == filteredPhotographer.id );
      }
      displayGallery(filteredMedia);
    }) 
    .catch(function (error) {
      console.log("error", error);
    });
}
showPhotographerProfil();

function setProfilHTML(photographer) {
  console.log('salut', photographer);
    let profilHTML = `
        <div class="photographer-description d-flex column">
            <h1>${photographer.name}</h1>
            <h2 id="location">${photographer.city}, ${photographer.country}</h2>
            <p id="catchphrase">${photographer.tagline}</p>
            <ul class="d-flex row tag-container">`;
    photographer.tags.forEach((tag) => {
      profilHTML += `<li class="tags"><a href='/index.html?tag=${tag}'>#${tag}</a></li>`;
    });
    profilHTML += `</ul>
      </div>
      <button class="open-modal-btn">Contactez-moi</button>
      <figure class="profil-pic">
          <img src="/assets/img/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}" alt="" />
        </figure>`;
    document.getElementById("banner-container").insertAdjacentHTML("beforeend", profilHTML);
}

function displayGallery(media) {
  console.log('hello', media);
  media.forEach((elt) => {
    let mediaHTML = `
    <figure class="picture-card d-flex column">
          <a href="#"
            ><img
              src="../assets/img/Sample_Photos/${elt.name}/${elt.image}"
              alt="Portrait d'une femme avec les cheveux roux et du rouge à lèvres "
          /></a>
          <div class="picture-description d-flex row">
            <h3 id="picture-name">${elt.image}</h3>
            <p>${elt.likes}</p>
            <svg
              aria-hidden="true"
              class="heart"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-describedby="title svg-description"
            >
              <title id="title">Coeur</title>
              <desc id="svg-description">la forme d'un coeur dessiné simplement</desc>
              <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              />
            </svg>
          </div>
        </figure>
    `;
    document.getElementById("gallery").insertAdjacentHTML("beforeend", mediaHTML);

  })
}

