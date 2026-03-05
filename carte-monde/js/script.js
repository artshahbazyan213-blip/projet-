const countries = {
  "France": {
    "capitale": "Paris",
    "population": "67 millions",
    "langue": "Français",
    "continent": "Europe",
    "position": "46.2276° N, 2.2137° E",
    "mapImage": "images/france-map.jpg",
    "lieux": [
      "Tour Eiffel",
      "Mont Saint-Michel",
      "Palace of Versailles"
    ]
  },
  "USA": {
    "capitale": "Washington D.C.",
    "population": "331 millions",
    "langue": "Anglais",
    "continent": "Amérique du Nord",
    "position": "37.0902° N, 95.7129° W",
    "mapImage": "images/usa-map.jpg",
    "lieux": [
      "Statue de la Liberté",
      "Grand Canyon",
      "Times Square"
    ]
  },
  "Japon": {
    "capitale": "Tokyo",
    "population": "125 millions",
    "langue": "Japonais",
    "continent": "Asie",
    "position": "36.2048° N, 138.2529° E",
    "mapImage": "images/japon-map.jpg",
    "lieux": [
      "Mont Fuji",
      "Kyoto",
      "Tokyo Tower"
    ]
  }
};

// Add event listeners to buttons immediately since data is loaded
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const countryName = button.getAttribute('data-country');
        showCountry(countryName);
    });
});

function showCountry(name) {
    const c = countries[name];
    const detailsEl = document.getElementById("details");
    const mapContainer = document.getElementById("countryMapContainer");

    if(c) {
        // Affiche infos
        detailsEl.innerText =
            "Nom : " + name +
            "\nCapitale : " + c.capitale +
            "\nPopulation : " + c.population +
            "\nLangue : " + c.langue +
            "\nContinent : " + c.continent +
            "\nPosition géographique : " + c.position;

        // Affiche carte et lieux
        let lieuxHtml = "<h3>3 lieux célèbres :</h3><ul>";
        c.lieux.forEach(l => {
            lieuxHtml += "<li>" + l + "</li>";
        });
        lieuxHtml += "</ul>";

        mapContainer.innerHTML =
            "<img src='" + c.mapImage + "' alt='Carte de " + name + "' class='fade-in'>" + lieuxHtml;

        // Add fade-in class
        mapContainer.classList.add('fade-in');

    } else {
        detailsEl.innerText = "Aucune information disponible.";
        mapContainer.innerHTML = "";
    }
}

function filterCountries() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(button => {
        const countryName = button.textContent.toLowerCase();
        if (countryName.includes(input)) {
            button.style.display = "inline-block";
        } else {
            button.style.display = "none";
        }
    });
}

function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById("darkModeToggle");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        toggleButton.textContent = "☀️ Mode Clair";
    } else {
        toggleButton.textContent = "🌙 Mode Sombre";
    }
}
