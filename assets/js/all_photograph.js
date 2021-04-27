function showPhotographers () {
    fetch ("/FishEyeDataFR.json")
    .then(response => {
        console.log(response.json())
    })
    .catch (function () {
       console.log('error') 
    })
}
showPhotographers()