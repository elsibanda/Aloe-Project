// Initialize the map
const map = L.map('map').setView([-30.5595, 22.9375], 6);

// Add base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let markers = []; // Store markers for later reference
let provinceList = new Set(); // Store unique provinces

// Function to get color based on flowering intensity
const getColor = (agreements) => {
    return agreements < 2 ? 'blue' : agreements < 5 ? 'yellow' : 'red';
};

// Load data from JSON
fetch('fruit.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
            // Create a circle marker for each location with dynamic color
            const marker = L.circleMarker([location.latitude, location.longitude], {
                radius: 8,
                color: getColor(location.num_identification_agreements),
                fillColor: getColor(location.num_identification_agreements),
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`
                <b>Species:</b> ${location.species_guess}<br>
                <b>County:</b> ${location.place_county_name}<br>
                <b>State:</b> ${location.place_state_name}<br>
                <b>Country:</b> ${location.place_country_name}<br>
                <b>Agreements:</b> ${location.num_identification_agreements}
            `);

            // Add marker to map and store with metadata
            markers.push({
                marker: marker,
                agreements: location.num_identification_agreements,
                state: location.place_state_name,
                county: location.place_county_name,
                country: location.place_country_name
            });

            // Add unique province to dropdown list
            provinceList.add(location.place_state_name);
        });

        // Populate province dropdown
        const provinceFilter = document.getElementById('province-filter');
        provinceList.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceFilter.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading data:', error));

// Function to update the results container
const updateResultsContainer = (results) => {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `
                <p><b>County:</b> ${result.county}<br>
                <b>State:</b> ${result.state}<br>
                <b>Country:</b> ${result.country}<br>
                <b>Agreements:</b> ${result.agreements}</p>
                <hr>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
};

// Function to reset marker colors
const resetMarkers = () => {
    markers.forEach(item => {
        item.marker.setStyle({
            color: getColor(item.agreements),
            fillColor: getColor(item.agreements),
            fillOpacity: 0.8
        });
    });
};

// Search by flowering intensity
document.getElementById('less-fruiting').addEventListener('click', () => {
    resetMarkers(); // Reset markers
    const results = markers.filter(item => item.agreements < 2); // Define threshold for "less flowering"
    updateResultsContainer(results);
    results.forEach(result => {
        result.marker.setStyle({
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 1
        });
    });
});

document.getElementById('more-fruiting').addEventListener('click', () => {
    resetMarkers(); // Reset markers
    const results = markers.filter(item => item.agreements >= 2); // Define threshold for "more flowering"
    updateResultsContainer(results);
    results.forEach(result => {
        result.marker.setStyle({
            color: 'red',
            fillColor: 'red',
            fillOpacity: 1
        });
    });
});

// Search by province
document.getElementById('province-search').addEventListener('click', () => {
    resetMarkers(); // Reset markers
    const province = document.getElementById('province-filter').value;
    const results = markers.filter(item => item.state === province);
    updateResultsContainer(results);
    results.forEach(result => {
        result.marker.setStyle({
            color: 'green',
            fillColor: 'green',
            fillOpacity: 1
        });
    });
});
