//Global function to display all the the photographers
const showPhotographers = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get("tag");
  // Find the .json file
  fetch("/FishEyeDataFR.json")
  // Promise for the response (here data)
    .then((response) => {
      // Display an error if note find or convert data in json
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    // Promise for filtering the right phtographer and display target data
    .then((data) => {
      let filteredPhotographers = data.photographers;
      // If there is the tag parameter in url, then find the first every photographers who have the same tag
      if (tagParam) {
        filteredPhotographers = filteredPhotographers.filter((photographer) => photographer.tags.includes(tagParam));
      } else {
        console.log("No tag found");
      }
      // Inject HTML of filtered photographers 
      setPhotographersHTML(filteredPhotographers);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}
// Call the function
showPhotographers();

// Function to set each photographer's card
const setPhotographersHTML = (photographers) => {
  photographers.forEach((element) => {
    let photographHTML = `
        <article class="d-flex column">
          <figure class="profil-pic"><a href="/pages/photograph.html?id=${element.id}"><img src="assets/img/Sample_Photos/Photographers_ID_Photos/${element.portrait}" alt="Profil de Kimi Keel" /></a></figure>
          <div class="d-flex column profil-description">
            <h2><a href="/pages/photograph.html?id=${element.id}">${element.name}</a></h2>
            <h3>${element.city},  ${element.country}</h3>
            <p>${element.tagline}</p>
            <p class="price">${element.price}€/jour</p>
            <ul class="d-flex row tags-container">`;
    // For each corresponding tag, set this html
    element.tags.forEach((tag) => {
      photographHTML += `<li class="tags"><a href='?tag=${tag}'>#${tag}</li>`;
    });
    photographHTML += `</ul>
    </div>
    </article>`;
    // Inject the previous HTML in photographer-list part
    document.querySelector(".photographers-list").insertAdjacentHTML("beforeend", photographHTML);
  });
}
