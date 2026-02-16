
// Initialize the map and set its view to a starting location and zoom level
const map = L.map('map').setView([-33.92, 18.42], 10); // Example coordinates for Cape Town, adjust as needed

// Load and display tile layer on the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample data: Array of plant growth locations with coordinates and details
const plantData = [
    { name: "Plant Site 1", lat: -33.92, lon: 18.42, growthInfo: "Optimal growth recorded in spring." },
    { name: "Plant Site 2", lat: -34.01, lon: 18.50, growthInfo: "Steady growth, mostly in shaded areas." },
    { name: "Plant Site 3", lat: -33.95, lon: 18.40, growthInfo: "Growth influenced by rainy season." },
];

// Function to add markers for predefined plant data
function addMarkers(data) {
    data.forEach(plant => {
        const marker = L.marker([plant.lat, plant.lon]).addTo(map);
        marker.bindPopup(`<strong>${plant.name}</strong><br>${plant.growthInfo}`);
    });
}

// Call function to add initial markers to the map
addMarkers(plantData);

// Event listener for clicks on the map
map.on('click', function(e) {
    // Get the latitude and longitude of the click event
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    // Create a new marker at the clicked location
    const newMarker = L.marker([lat, lon]).addTo(map);

    // Sample information to display; you can customize this or make it dynamic
    const info = `<strong>Clicked Location</strong><br>Latitude: ${lat.toFixed(4)}<br>Longitude: ${lon.toFixed(4)}<br>Growth data not available.`;

    // Bind a popup to the new marker
    newMarker.bindPopup(info).openPopup();
});


