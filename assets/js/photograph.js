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



