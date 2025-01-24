const apiKey = "AIzaSyCYk7iP7CYuFh6YQq9Q1RkTFfuM-H3odIw"; // Your API key
const cx = "0040a06e884744145"; // Your Search Engine ID

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        alert("Please enter a search query!");
        return;
    }

    // Show loading spinner
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');

    // Fetch results from Google Custom Search API
    fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = ""; // Clear previous results

            if (data.items) {
                // Display results
                data.items.forEach(item => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result-item");

                    resultDiv.innerHTML = `
                        <a href="${item.link}" target="_blank">${item.title}</a>
                        <p>${item.snippet}</p>
                    `;
                    resultsContainer.appendChild(resultDiv);
                });

                document.getElementById('loading').classList.add('hidden');
                document.getElementById('results').classList.remove('hidden');
            } else {
                // No results found
                document.getElementById('loading').classList.add('hidden');
                document.getElementById('results').classList.remove('hidden');
                resultsContainer.innerHTML = "<p class='text-center' style='color: #f48c42;'>No results found.</p>"; // Updated for dark mode design
            }
        })
        .catch(error => {
            console.error("Error fetching results:", error);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('results-container').innerHTML = "<p class='text-center' style='color: #f48c42;'>Failed to fetch results. Please try again later.</p>"; // Updated for error styling
        });
});
