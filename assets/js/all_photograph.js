function showPhotographers() {
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get("tag");
  console.log("coucou", tagParam);
  fetch("/FishEyeDataFR.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      let filteredPhotographers = data.photographers;
      if (tagParam) {
        filteredPhotographers = filteredPhotographers.filter(function (photographer) {
          return photographer.tags.includes(tagParam);
        });
      }
      setPhotographersHTML(filteredPhotographers);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}
showPhotographers();

function setPhotographersHTML(photographers) {
  console.log(photographers);
  photographers.forEach((element) => {
    let photographHTML = `
        <article class="d-flex column">
          <figure class="profil-pic"><a href="/pages/photograph.html"><img src="assets/img/Sample_Photos/Photographers_ID_Photos/${element.portrait}" alt="Profil de Kimi Keel" /></a></figure>
          <div class="d-flex column profil-description">
            <h2><a href="/pages/photograph.html">${element.name}</a></h2>
            <h3>${element.city},  ${element.country}</h3>
            <p>${element.tagline}</p>
            <p class="price">${element.price}€/jour</p>
            <ul class="d-flex row tags-container">`;
    element.tags.forEach((tag) => {
      photographHTML += `<li class="tags"><a href='?tag=${tag}'>#${tag}</li>`;
    });
    photographHTML += `</ul>
    </div>
    </article>`;
    document.querySelector(".photographers-list").insertAdjacentHTML("beforeend", photographHTML);
  });
}
