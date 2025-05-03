const fromSelect = document.querySelector(".from-section");
const fromLogo = document.getElementById("fromLogo");

async function loadCryptoOptions() {
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    try {
        const response = await fetch(URL);
        const data = await response.json();

        // Fill "from" dropdown only
        data.slice(0, 20).forEach(coin => {
            const option = document.createElement("option");
            option.value = coin.symbol.toUpperCase();
            option.textContent = coin.symbol.toUpperCase();
            option.setAttribute("data-logo", coin.image); // store logo in option
            fromSelect.appendChild(option);
        });

        // Set initial logo
        fromLogo.src = fromSelect.options[0].getAttribute("data-logo");

        // When user selects a new coin, update logo
        fromSelect.addEventListener("change", () => {
            const selectedOption = fromSelect.options[fromSelect.selectedIndex];
            const logoUrl = selectedOption.getAttribute("data-logo");
            fromLogo.src = logoUrl;
        });

    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
}



loadCryptoOptions();
