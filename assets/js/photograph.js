import { Lightbox } from "./lightbox.js";
import { setModal } from "./modal.js";
//Global function to display page of the photographer
const showPhotographerProfil = () => {
  // Get the right url and inject the id parameter
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  // Find the .json file
  fetch("/FishEyeDataFR.json")
    //promise for the response (here data)
    .then((response) => {
      // Display an error if note find or convert data in json
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    // Promise for filtering the right phtographer and display target data
    .then((data) => {
      let filteredPhotographer;
      // If there is the id parameters in url, then find the first photographer who have the same id in the json file
      if (idParam) {
        filteredPhotographer = data.photographers.find((photographer) => photographer.id == idParam);
      } else {
        console.log("No id found");
      }
      // Set the html of the profil
      setProfilHTML(filteredPhotographer);
      let filteredMedia;
      // If there is the id parameters, then find media which has a common id
      if (idParam) {
        filteredMedia = data.media.filter((media) => media.photographerId == filteredPhotographer.id);
        buildOptionsList(filteredMedia, filteredPhotographer.name.split(" ")[0]);
      } else {
        console.log("No media found");
      }
      // Set modal
      setModal();
      // Set the gallery part
      displayGallery(filteredMedia, filteredPhotographer.name.split(" ")[0]);
      // Set the lightbox
      Lightbox();
    })
    .catch(function (error) {
      console.log("error", error);
    });
};
// Use the function define previously
showPhotographerProfil();

// Function for the banner part which include main infoirmation about the photographer
const setProfilHTML = (photographer) => {
  let profilHTML = `
        <div class="photographer-description d-flex column">
            <h1>${photographer.name}</h1>
            <h2 id="location">${photographer.city}, ${photographer.country}</h2>
            <p id="catchphrase">${photographer.tagline}</p>
            <ul class="d-flex row tag-container">`;
  // For each corresponding tag, set this html
  photographer.tags.forEach((tag) => {
    profilHTML += `<li class="tags"><a href='/index.html?tag=${tag}'>#${tag}</a></li>`;
  });
  profilHTML += `</ul>
      </div>
      <button class="open-modal-btn"><a href="#modal-photographer" class="js-modal">Contactez-moi</a></button>
      <figure class="profil-pic">
          <img src="/assets/img/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}" alt="" />
        </figure>
        <p class ="d-flex row" id="likes-price">
        <span id="total-likes"></span>
        <span id="price">${photographer.price}€ / jour</span>
        </p>`;
  // Inject the previous HTML in banner-container part
  document.getElementById("banner-container").insertAdjacentHTML("beforeend", profilHTML);
  // Add photographer's name in contact form
  document.querySelector("#titlemodal").innerHTML = `Contactez-moi </br> ${photographer.name}`;
};

// Function in order to display the right gallery of media, corresponding to the called photographer
const displayGallery = (media, folderName) => {
  document.getElementById("gallery").innerHTML = "";
  let totalLikes = 0;
  media.forEach((elt, i) => {
    totalLikes += elt.likes;
    let mediaHTML;
    if (elt.image) {
      mediaHTML = `
      <figure class="picture-card d-flex column">
            <a href="../assets/img/Sample_Photos/${folderName}/${elt.image} " class="jsMedia"
              ><img
                src="../assets/img/Sample_Photos/${folderName}/${elt.image} "
                alt="Portrait d'une femme avec les cheveux roux et du rouge à lèvres "
                
            /></a>
            <div class="picture-description d-flex row">
              <h3 id="picture-name">${elt.title}</h3>
              <p class="counter-like">${elt.likes}</p>
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
    } else if (elt.video) {
      // get only the name of the video
      let videoName = elt.video.split(".")[0];
      //Create html of the media
      mediaHTML = `<figure class="picture-card d-flex column">
      <a data-folderName="${folderName}" data-videoName="${videoName}" data-mediaType="video" class="jsMedia" href="../assets/img/Sample_Photos/${folderName}/${videoName}.mp4 "
      ><video width="250" >
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.mp4
              type="video/mp4">
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.ogv
              type="video/ogg">
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.webm
              type="video/webm">
        Sorry, your browser doesn't support embedded videos.
        </video></a>
        <div class="picture-description d-flex row">
          <h3 id="picture-name">${elt.title}</h3>
          <p class="counter-like">${elt.likes}</p>
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
    } else {
      // error message
      mediaHTML = `<p id="errorMedia">Sorry we didn't find anything for this photographer</p>`;
    }
    // Add it to gallery section
    document.getElementById("gallery").insertAdjacentHTML("beforeend", mediaHTML);
    // Animation for the like button on each media
    const heart = document.getElementsByClassName('heart')[i]
    heart.addEventListener( 'click',  function likeButton(){
      let counterLike = document.getElementsByClassName('counter-like')[i];
      elt.likes++;
      counterLike.innerHTML = elt.likes;
      totalLikes++;
      document.getElementById('total-likes').innerHTML = totalLikes + " ♥";
    });
  });
  document.getElementById('total-likes').innerHTML = totalLikes + " ♥";
};

// Deploy filters menu
document.querySelector("#filters").addEventListener("click", function () {
  this.querySelector(".option-wrapper").classList.toggle("open");
  this.querySelector(".filters-options-list").classList.toggle("open");
});

// Use filters
let filtersOptions = ["Popularité", "Date", "Titre"];
// Construct ordering possibilities
const buildOptionsList = (medias, photographerName, orderedOptions = filtersOptions) => {
  document.getElementById("filters-options-list").innerHTML = "";
  // Create each li element (options)
  orderedOptions.forEach((elt) => {
    let options = document.createElement("li");
    options.setAttribute("id", "filters-options-" + elt);
    options.classList.add("option");
    options.setAttribute("aria-selected", "false");
    options.setAttribute("role", "option");
    options.innerHTML = `${elt}`;
    document.getElementById("filters-options-list").append(options);
    clickOnFilter(medias, photographerName, options, elt);
  });
};
// Define filtering function on each button
const clickOnFilter = (medias, photographerName, li, optionName) => {
  li.addEventListener("click", (e) => {
    let orderedMedia = medias;
    if (optionName == "Date") {
      orderedMedia = orderByDate(e, medias);
      // Reorder the array to reorder option selection
      filtersOptions = ["Date", "Popularité", "Titre"];
    } else if (optionName == "Titre") {
      orderedMedia = orderByTitle(e, medias);
      filtersOptions = ["Titre", "Date", "Popularité"];
    } else if (optionName == "Popularité") {
      orderedMedia = orderByPop(e, medias);
      filtersOptions = ["Popularité", "Date", "Titre"];
    }
    // Replace button inner text by the current applied filter
    document.querySelector(".option-wrapper button span").textContent = optionName;
    displayGallery(orderedMedia, photographerName);
    Lightbox();
    buildOptionsList(orderedMedia, photographerName);
  });
};

// Close filters if there is a click outside
window.addEventListener("click", function (e) {
  const select = document.querySelector(".option-wrapper");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

// reorder media by date
const orderByDate = (e, filteredMedia) => {
  return filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
};
// reorder media by title
const orderByTitle = (e, filteredMedia) => {
  return filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
};
// reorder media by popularity
const orderByPop = (e, filteredMedia) => {
  return filteredMedia.sort((a, b) => b.likes - a.likes);
};


