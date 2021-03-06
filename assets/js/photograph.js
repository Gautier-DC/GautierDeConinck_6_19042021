import { Lightbox } from './lightbox.js';
import { setModal } from './modal.js';
//Global function to display page of the photographer
const showPhotographerProfil = () => {
  // Get the right url and inject the id parameter
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  // Find the .json file
  fetch('../../FishEyeDataFR.json')
    //promise for the response (here data)
    .then((response) => {
      // Display an error if note find or convert data in json
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
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
        console.log('No id found');
      }
      // Set the html of the profil
      setProfilHTML(filteredPhotographer);
      let filteredMedia;
      // If there is the id parameters, then find media which has a common id
      if (idParam) {
        filteredMedia = data.media.filter((media) => media.photographerId == filteredPhotographer.id);
        buildOptionsList(filteredMedia, filteredPhotographer.name.split(' ')[0]);
      } else {
        console.log('No media found');
      }
      // Set modal
      setModal();
      // Set the gallery part
      displayGallery(filteredMedia, filteredPhotographer.name.split(' ')[0]);
      // Set the lightbox
      Lightbox();
    })
    .catch(function (error) {
      console.log('error', error);
    });
};
// Use the function define previously
showPhotographerProfil();

// Function for the banner part which include main infoirmation about the photographer
const setProfilHTML = (photographer) => {
  document.getElementsByTagName('title')[0].innerText = `Fisheye - Profil de ${photographer.name}`;
  let profilHTML = `
        <div class='photographer-description d-flex column'>
            <h1>${photographer.name}</h1>
            <h2 id='location'>${photographer.city}, ${photographer.country}</h2>
            <p id='catchphrase'>${photographer.tagline}</p>
            <ul class='d-flex row tag-container'>`;
  // For each corresponding tag, set this html
  photographer.tags.forEach((tag) => {
    profilHTML += `<li class='tags'><a href='/index.html?tag=${tag}'>#${tag}</a></li>`;
  });
  profilHTML += `</ul>
      </div>
      <a href='#modal-photographer' class='open-modal-btn js-modal' aria-pressed='false' role='button'>Contactez-moi</a>
      <figure class='profil-pic'>
        <img src='/assets/img/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}' alt='' />
      </figure>
      <div class ='d-flex row' id='likes-price'>
      <span id='total-likes'></span>
      <span id='price'>${photographer.price}??? / jour</span>
      </div>`;
  // Inject the previous HTML in banner-container part
  document.getElementById('banner-container').insertAdjacentHTML('beforeend', profilHTML);
  // Add photographer's name in contact form
  document.querySelector('#titlemodal').innerHTML = `Contactez-moi </br> ${photographer.name}`;
};

// Function in order to display the right gallery of media, corresponding to the called photographer
const displayGallery = (media, folderName) => {
  let gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  let totalLikes = 0;
  media.forEach((elt, i) => {
    totalLikes += elt.likes;
    // Set the HTML common to neither video or picture
    let structureMediaHTML = `
    <figure class='picture-card d-flex column'>
      <div class='picture-description d-flex row'>
        <h3 class='picture-name'>${elt.title}</h3>
        <p class='counter-like'>${elt.likes}</p>
        <i class='fas fa-heart heart' tabindex='0'></i>
      </div>
    </figure>
    `;
    // Set HTML of the specific media or error
    let mediaHTML;
    if (elt.image) {
      mediaHTML = `
          <a href='../assets/img/Sample_Photos/${folderName}/${elt.image} ' class='jsMedia'
          tabindex='0' data-alt='${elt.alt}' data-title='${elt.title}'><img
              src='../assets/img/Sample_Photos/${folderName}/${elt.image} '
              alt='${elt.alt}'              
          /></a>
        `;
    } else if (elt.video) {
      // get only the name of the video
      let videoName = elt.video.split('.')[0];
      //Create html of the media
      mediaHTML = `
      <a data-folderName='${folderName}' data-videoName='${videoName}' data-mediaType='video' data-alt='${elt.alt}' data-title='${elt.title}' class='jsMedia' href='../assets/img/Sample_Photos/${folderName}/${videoName}.mp4' tabindex='0'
      ><video width='250' tabindex='-1' >
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.mp4
              type='video/mp4'>
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.ogv
              type='video/ogg'>
        <source src=../assets/img/Sample_Photos/${folderName}/${videoName}.webm
              type='video/webm'>
        Sorry, your browser doesn't support embedded videos.
        </video></a>        
        `;
    } else {
      // error message
      structureMediaHTML = `<p id='errorMedia'>Sorry we didn't find anything for this photographer</p>`;
    }
    // Add it to gallery section
    gallery.insertAdjacentHTML('beforeend', structureMediaHTML);
    document.getElementsByClassName('picture-card')[i].insertAdjacentHTML('afterbegin', mediaHTML);
    // Animation and counterfor the like button on each media
    const heart = document.getElementsByClassName('heart')[i];
    const likeButton = (e) => {
      e.preventDefault();
      let counterLike = document.getElementsByClassName('counter-like')[i];
      // Add +1 on media counter
      elt.likes++;
      // Refresh likes of media counter
      counterLike.innerHTML = elt.likes;
      // Add +1 on total counter
      totalLikes++;
      // Refresh likes of media counter
      document.getElementById('total-likes').innerHTML = totalLikes + ' ???';
      // Set animation of the heart
      if (heart.classList.contains('like-anim')) {
        heart.classList.remove('like-anim');
      }
      setTimeout(function () {
        heart.classList.add('like-anim');
      }, 10);
    }
    // Like on click and with enter
    heart.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        likeButton(e);
      }
    });
    heart.onclick = (e) =>{
      likeButton(e);
    };
  });
  document.getElementById('total-likes').innerHTML = totalLikes + ' ???';  
};

const optionWrapper = document.querySelector('.option-wrapper');
const optionList = document.querySelector('.filters-options-list');
// Deploy filters menu
document.querySelector('#filters').addEventListener('click', function () {
  this.querySelector('.option-wrapper').classList.toggle('open');
  this.querySelector('.filters-options-list').classList.toggle('open');
});

// Use filters
let filtersOptions = ['Popularit??', 'Date', 'Titre'];
// Construct ordering possibilities
const buildOptionsList = (medias, photographerName, orderedOptions = filtersOptions) => {
  document.getElementById('filters-options-list').innerHTML = '';
  // Create each li element (options)
  orderedOptions.forEach((elt) => {
    let options = document.createElement('li');
    options.setAttribute('id', 'filters-options-' + elt);
    options.classList.add('option');
    options.setAttribute('aria-selected', 'false');
    options.setAttribute('role', 'option');
    options.setAttribute('tabindex', '0');
    options.innerHTML = `${elt}`;
    document.getElementById('filters-options-list').append(options);
    clickOnFilter(medias, photographerName, options, elt);
  });
};
// Define filtering function on each button
const clickOnFilter = (medias, photographerName, li, optionName) => {
  // Function to filter the content
  const handleFilters = (e) => {
    e.preventDefault();
    let orderedMedia = medias;
    if (optionName == 'Date') {
      orderedMedia = orderByDate(e, medias);
      // Reorder the array to reorder option selection
      filtersOptions = ['Date', 'Popularit??', 'Titre'];
    } else if (optionName == 'Titre') {
      orderedMedia = orderByTitle(e, medias);
      filtersOptions = ['Titre', 'Date', 'Popularit??'];
    } else if (optionName == 'Popularit??') {
      orderedMedia = orderByPop(e, medias);
      filtersOptions = ['Popularit??', 'Date', 'Titre'];
    }
    // Replace button inner text by the current applied filter
    document.querySelector('.option-wrapper button span').textContent = optionName;
    displayGallery(orderedMedia, photographerName);
    Lightbox();
    buildOptionsList(orderedMedia, photographerName);
  };
  // Filter onClick
  li.onclick = (e) => {
    handleFilters(e)
  }
  // Filter when enter is press
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleFilters(e);
      optionWrapper.classList.remove('open');
      optionList.classList.remove('open');
    }
  });
  // Close filters if there is a click outside
  window.addEventListener('click', function (e) {
    if (!optionWrapper.contains(e.target)) {
      optionWrapper.classList.remove('open');
      optionList.classList.remove('open');
    }
  });
};


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
