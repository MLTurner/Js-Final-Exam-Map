//Create map, including user coordinates, markers, and businesses
/*const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
*/
    /*createMap(){
        this.map = L.map('map', {
            center: [this.coordinates],
            zoom: 13,
    });
    //create tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(this.map);
    //create markers
        const marker = L.marker([this.coordinates]).addTo(this.map);
        marker.bindPopup('<b>You are here!</b>').openPopup();
     
    //create business markers
        const busMarker = L.marker([this.businesses]).addTo(this.map);
        marker.bindPopup('')
    }
//}

async function getLocation(){
        const latlng = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }); 
        return [latlng.coordinates.latitude, latlng.coordinates.longitude]
    }

async function getFoursquare

function main(){
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
}
createMap(){
    this.map = L.map('map', {
        center: [this.coordinates],
        zoom: 13,
});
//create tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this.map);
//create markers
    const marker = L.marker([this.coordinates]).addTo(this.map);
    marker.bindPopup('<b>You are here!</b>').openPopup();

}
}
*/



const myMap = {
    location: [],
    businesses: [],
    map: {},
    markers: {},
  
 //Create map, including user coordinates, markers, and businesses 
createMap(){
    this.map = L.map('map', {
    center: this.location,
    zoom: 15,
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '12.5',
    }).addTo(this.map)
  
    const marker = L.marker(this.location)
    marker.addTo(this.map).bindPopup('<p1><b>You are here!</b><br></p1>').openPopup()},
  
    addMarkers(){
      for (let i = 0; i < this.businesses.length; i++) {
      this.markers = L.marker([
        this.businesses[i].lat,
        this.businesses[i].long,
      ])
  .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
  .addTo(this.map)
      }
    },
  }
  
//obtain user's current location 
  async function getLocation(){
    const latlng = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [latlng.coords.latitude, latlng.coords.longitude]
  }


   
//coffee shop/bakeries/restaurants/hotels code from Foursquare
  async function getFoursquare(business){
    const options = {
      method: 'GET',
      headers: {
      Accept: 'application/json',
      Authorization: 'fsq3HIE56gYKCn/ULebqRc5VZg+gLuHWpoqw2G6jKedalWQ='
      }
    }
    let limit = 5
    let lat = myMap.location[0]
    let lon = myMap.location[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
  }
  
  //return foursquare array
  function findBusinesses(data){
    let businesses = data.map((element) => {
      let location = {
        name: element.name,
        lat: element.geocodes.main.latitude,
        long: element.geocodes.main.longitude
      };
      return location
    })
    return businesses
  }

//make location request happen on browser load  
  window.onload = async () => {
    const coords = await getLocation();
    myMap.location = coords;
    myMap.createMap();
  };
  
//Map 5 nearest business type locations with Foursquare API
  document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault();
    let business = document.getElementById('business').value;
    let data = await getFoursquare(business);
    myMap.businesses = findBusinesses(data);
    myMap.addMarkers();
  });