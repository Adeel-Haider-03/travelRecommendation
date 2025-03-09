document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");
    const clearButton = document.querySelector("#clear-button");
    const resultsContainer = document.querySelector("#results");

    // Fetch JSON data
    let travelData = {};
    fetch("./travel_recommendation_api.json") 
        .then(response => response.json())
        .then(data => {
            travelData = data;
        })
        .catch(error => console.error("Error fetching data:", error));

    // Function to search and display results
    function searchResults() {
        const query = searchInput.value.trim().toLowerCase();
        resultsContainer.innerHTML = ""; // Clear previous results

        if (!query) return;

        let results = [];

        // Search for beaches
        if (query.includes("beach")) {
            results = travelData.beaches.slice(0, 2);
        }
        // Search for temples
        else if (query.includes("temple")) {
            results = travelData.temples.slice(0, 2);
        }
        // Search for countries
        else {
            travelData.countries.forEach(country => {
                if (query.includes(country.name.toLowerCase())) {
                    results.push(...country.cities.slice(0, 2));
                }
            });
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        // Display results
        results.forEach(place => {
            const placeCard = document.createElement("div");
            placeCard.classList.add("place-card");
            placeCard.innerHTML = `
                <img src="${place.imageUrl}" alt="${place.name}" class="place-image">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            `;
            resultsContainer.appendChild(placeCard);
        });

    
    }


    // Function to clear search results
    function clearResults() {
        searchInput.value = "";
        resultsContainer.innerHTML = "";
    }

    searchButton.addEventListener("click", searchResults);
    clearButton.addEventListener("click", clearResults);
});
