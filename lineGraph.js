// Fix file paths by using forward slashes or escaped backslashes
let buddingName = 'C:/Users/forev/OneDrive/Desktop/AloePhenologyCSV/budding.csv';
let flowerName = 'C:/Users/forev/OneDrive/Desktop/AloePhenologyCSV/flower.csv';
let fruitName = 'C:/Users/forev/OneDrive/Desktop/AloePhenologyCSV/fruit.csv';

// Function to parse and format date
function processDate(dateString) {
    const date = new Date(dateString);
    return {
        fullDate: dateString,
        year: date.getFullYear(),
        month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
        monthNum: date.getMonth() + 1, // 1-12
        day: date.getDate()
    };
}

// First, verify data loading with correct columns
Promise.all([
    d3.csv(buddingName),
    d3.csv(flowerName),
    d3.csv(fruitName)
]).then(function([buddingData, flowerData, fruitData]) {
    // Log first few rows to verify data structure
    console.log("Sample budding data:", buddingData.slice(0, 3));
    console.log("Sample flower data:", flowerData.slice(0, 3));
    console.log("Sample fruit data:", fruitData.slice(0, 3));

    // Process the data with correct column names
    const processedData = {
        budding: buddingData.map(row => ({
            num_identification_agreements: parseInt(row.num_identification_agreements),
            observed_on: row.observed_on,
            month: new Date(row.observed_on).getMonth()
        })),
        flower: flowerData.map(row => ({
            num_identification_agreements: parseInt(row.num_identification_agreements),
         //   observed_on: row.observed_on,
         //   month: new Date(row.observed_on).getMonth()
        })),
        fruit: fruitData.map(row => ({
            num_identification_agreements: parseInt(row.num_identification_agreements),
            observed_on: row.observed_on,
           month: new Date(row.observed_on).getMonth()
        }))
    };

    // Group data by month
    const monthlyData = aggregateByMonth(processedData);
    
    // Create visualization
    createVisualization(monthlyData);
    
}).catch(error => console.error("Error processing data:", error));

function aggregateByMonth(data) {
    const months = Array(12).fill(0).map((_, i) => i); // 0-11 for all months
    
    const monthlyTotals = {
        budding: months.map(month => ({
            month: month,
            total: data.budding
                .filter(d => d.month === month)
                .reduce((sum, d) => sum + d.num_identification_agreements, 0)
        })),
        flower: months.map(month => ({
            month: month,
            total: data.flower
                .filter(d => d.month === month)
                .reduce((sum, d) => sum + d.num_identification_agreements, 0)
        })),
        fruit: months.map(month => ({
            month: month,
            total: data.fruit
                .filter(d => d.month === month)
                .reduce((sum, d) => sum + d.num_identification_agreements, 0)
        }))
    };
    
    return monthlyTotals;
}

function createVisualization(monthlyData) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const config = {
        type: 'line',
        data: {
            labels: monthNames,
            datasets: [
                {
                    label: 'Budding Agreements',
                    data: monthlyData.budding.map(d => d.total),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Flowering Agreements',
                    data: monthlyData.flower.map(d => d.total),
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Fruiting Agreements',
                    data: monthlyData.fruit.map(d => d.total),
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Identification Agreements'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Monthly Phenology Identification Agreements'
                }
            }
        }
    };

    // If chart already exists, destroy it
    if (window.growthChart instanceof Chart) {
        window.growthChart.destroy();
    }
    
    // Create new chart
    const ctx = document.getElementById('your-chart-canvas-id').getContext('2d');
    window.growthChart = new Chart(ctx, config);
}