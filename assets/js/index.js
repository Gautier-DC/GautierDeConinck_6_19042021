function showFilters() {
    fetch("/FishEyeDataFR.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setFiltersHTML(data.photographers);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }
  showFilters();

  function setFiltersHTML(photographers) {
      console.log(photographers);
      let elfilters = document.getElementById('filters-tags-container');
      let types = [];

      for(let i in photographers) {
          for(let j in photographers[i].type) {
              tags.push(photographers[i].type[j]);
          }
      }

    let uniqueTypes = types.filter( (value, index, self) => self.indexOf(value) === index );
    let htmlTypes = '';

  }