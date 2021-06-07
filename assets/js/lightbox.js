export const Lightbox = () => {
  //DOM Selector
  let mainWrapper = document.getElementById('main-wrapper');
  let prevLightbox = document.getElementsByClassName('lightbox');
  // Create lightbox

  // Remove any lightbox div that already exist
  if(prevLightbox.length > 0) {
    prevLightbox[0].remove();
  }
  // Set lightbox basics
  let currentMediaIndex;
  const lightboxDiv = document.createElement('div');
  lightboxDiv.classList.add('lightbox', 'hidden');
  lightboxDiv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lightboxDiv);
  lightboxDiv.innerHTML = `<button class='lightbox__close'><i class='fas fa-times'></i></button>
  <button class='lightbox__next'><i class='fas fa-chevron-right'></i></button>
  <button class='lightbox__prev'><i class='fas fa-chevron-left'></i></button>
  <div class='lightbox__container d-flex column'>
  </div>`;
  
  const playInnerVideo = (e) => {
    let lightboxVideo = document.getElementsByClassName('lightbox-video')[0];
    e.preventDefault();
    // toggle play/pause
    if(lightboxVideo.paused) { 
      lightboxVideo.play(); 
    } else { 
      lightboxVideo.pause(); 
    }
  } 
  const handlePressPlay = (e) => {
    if ( (e || window.event).keyCode === 13 ) {
      playInnerVideo(e);
    }
  }

  // Close the lightbox on click and with escape
  const closeLightbox = (e) =>{
    e.preventDefault();
    lightboxDiv.classList.add('hidden');
    document.body.style.overflow = 'auto';
    mainWrapper.setAttribute('aria-hidden', 'false');
    lightboxDiv.setAttribute('aria-hidden', 'true');
    window.removeEventListener('keydown', handlePressPlay);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox(e);
    }
  });
  document.querySelector('.lightbox__close').onclick = (e) => {
    closeLightbox(e);
  };


  // Next media
  const handleNext = (e) => {
    e.preventDefault();
    window.removeEventListener('keydown', handlePressPlay);
    // if last media then select first one in list
    if (currentMediaIndex == medias.length - 1) {
      setLightboxContent(medias[0]);
      currentMediaIndex = 0;
    } else {
      // if there is a next media display it
      setLightboxContent(medias[currentMediaIndex + 1]);
      currentMediaIndex = currentMediaIndex + 1;
    }
  };

  // Navigate with keyboard or inner arrows
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      handleNext(e);
    }
  });
  document.querySelector('.lightbox__next').onclick = (e) => {
    handleNext(e);
  };

  // Previous media
  const handlePrev = (e) => {
    e.preventDefault();
    window.removeEventListener('keydown', handlePressPlay);
    // if first media then select last one in list
    if (currentMediaIndex == 0) {
      setLightboxContent(medias[medias.length - 1]);
      currentMediaIndex = medias.length - 1;
    } else {
      // if there is a next media display it
      setLightboxContent(medias[currentMediaIndex - 1]);
      currentMediaIndex = currentMediaIndex - 1;
    }
  };

  // navigate with keyboard or inner arrows
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev(e);
    }
  });
  document.querySelector('.lightbox__prev').onclick = (e) => {
    handlePrev(e);
  };

  // Create content to display in the lightbox
  let lightboxContainer = document.querySelector('.lightbox__container');
  const setLightboxContent = (currentMedia) => {
    if (currentMedia.dataset.mediatype === 'video') {
      lightboxContainer.innerHTML = `
      <video class='lightbox-video' controls alt='${currentMedia.dataset.alt}'>
      <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.mp4
      type='video/mp4'>
      <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.ogv
      type='video/ogg'>
      <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.webm
      type='video/webm'>
      Sorry, your browser doesn't support embedded videos.
      </video>
      <h3 class='picture-description'>${currentMedia.dataset.title}</h3>`;        
      window.addEventListener('keydown', handlePressPlay);      
    } else {
      lightboxContainer.innerHTML = `
      <img src='${currentMedia.href}' alt='${currentMedia.dataset.alt}'>
      <h3 class='picture-description'>${currentMedia.dataset.title}</h3>`;
    }
        
  };
  // Get the media
  const medias = Array.from(document.querySelectorAll('.jsMedia'));
  
  
  // Once you have the media create html for it
  for (let i = 0 ; i < medias.length ; i++ ) {
    medias[i].addEventListener('click', (e) => {
      e.preventDefault();
      mainWrapper.setAttribute('aria-hidden', 'true');
      lightboxDiv.classList.remove('hidden');
      lightboxDiv.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      currentMediaIndex = i;
      setLightboxContent(medias[currentMediaIndex]);
      lightboxDiv.focus();
    });
  };
};
