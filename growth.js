const ctx = document.getElementById('growthChart').getContext('2d');

const plantLabels = [
    "Plant 1", "Plant 2", "Plant 3", "Plant 4", "Plant 5",
    "Plant 6", "Plant 7", "Plant 8", "Plant 9", "Plant 10"
];

const data = {
    labels: plantLabels,
    datasets: [
        {
            label: 'Height (cm)',
            data: [20, 25, 30, 22, 28, 33, 35, 38, 40, 42],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Leaf Count',
            data: [15, 18, 20, 16, 22, 25, 26, 28, 30, 32],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Root Length (cm)',
            data: [10, 12, 15, 11, 14, 16, 18, 20, 22, 24],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: false,
            tension: 0.1
        }
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Growth Level'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Plants'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
};

const growthChart = new Chart(ctx, config);
