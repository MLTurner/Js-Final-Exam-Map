//Create map, including user coordinates, markers, and businesses
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

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

async function getLocation(){
        const latlng = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }); 
        return [latlng.coordinates.latitude, latlng.coordinates.longitude]
    }

  
      
      
//window.onload =

//Map location with fetch request

  
//Return an array with objects of longitude and latitude


//Append user's location to document


//Select interface with values


//Allow user to select business type


//Need event to fire when user selects type


//Map 5 nearest business type locations with Foursquare API