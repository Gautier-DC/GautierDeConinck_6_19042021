export const Lightbox = () => {
  // Create lightbox
  let currentMediaIndex;
  const lightboxDiv = document.createElement("div");
  lightboxDiv.classList.add("lightbox", "hidden");
  document.body.appendChild(lightboxDiv);
  lightboxDiv.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
  <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
  <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
  <div class="lightbox__container d-flex column">
  </div>`;
  

  // Close the lightbox
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      lightboxDiv.classList.add("hidden");
    }
  });
  document.querySelector(".lightbox__close").onclick = (e) => {
    e.preventDefault();
    lightboxDiv.classList.add("hidden");
  };


  // Next media
  const handleNext = (e) => {
    e.preventDefault();
    // if last media then select first one in list
    if (currentMediaIndex == medias.length - 1) {
      setLightboxContent(medias[0]);
      currentMediaIndex = 0
    } else {
      // if there is a next media display it
      setLightboxContent(medias[currentMediaIndex + 1]);
      currentMediaIndex = currentMediaIndex + 1
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      handleNext(e);
    }
  });
  document.querySelector(".lightbox__next").onclick = (e) => {
    handleNext(e);
  };

  // Previous media
  const handlePrev = (e) => {
    e.preventDefault();
    // if first media then select last one in list
    if (currentMediaIndex == 0) {
      setLightboxContent(medias[medias.length - 1]);
      currentMediaIndex = medias.length - 1
    } else {
      // if there is a next media display it
      setLightboxContent(medias[currentMediaIndex - 1]);
      currentMediaIndex = currentMediaIndex - 1
    }
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      handlePrev(e);
    }
  });
  document.querySelector(".lightbox__prev").onclick = (e) => {
    handlePrev(e);
  };

  // Create content to display in the lightbox
  const setLightboxContent = (currentMedia) => {
    if (currentMedia.dataset.mediatype === "video") {
      document.querySelector(".lightbox__container").innerHTML = `
          <video controls>
          <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.mp4
                type="video/mp4">
          <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.ogv
                type="video/ogg">
          <source src=../assets/img/Sample_Photos/${currentMedia.dataset.foldername}/${currentMedia.dataset.videoname}.webm
                type="video/webm">
          Sorry, your browser doesn't support embedded videos.
          </video>
          <h3 class="picture-description" id="picture-name">` + currentMedia.href.split('/')[7].replace(/_/g, ' ').slice(0, -4) + `</h3>`;
    } else {
      document.querySelector(".lightbox__container").innerHTML = `
      <img src="${currentMedia.href}" alt="">
      <h3 class="picture-description" id="picture-name">` + currentMedia.href.split('/')[7].replace(/_/g, ' ').slice(0, -4) + `</h3>`;
    }
  };

  // Get the media
  const medias = Array.from(document.querySelectorAll(".jsMedia"));
    
  // Once you have the media create html for it
  for (let i = 0 ; i < medias.length ; i++ ) {
    medias[i].addEventListener("click", (e) => {
      e.preventDefault();
      lightboxDiv.classList.remove("hidden");
      currentMediaIndex = i
      setLightboxContent(medias[currentMediaIndex]);
    });
  }
};
