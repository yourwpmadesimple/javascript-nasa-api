// Get Elements
const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// Results Array
let resultsArray = [];
//Favorites Object
let favorites = {};

// Update DOM
function updateDom() {
  resultsArray.forEach((result) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("card");

    // Link that wraps image
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = result.title;
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add To Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);

    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;

    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;

    // Copyright
    const copyright = document.createElement("strong");
    result.copyright
      ? (copyright.textContent = ` ${result.copyright}`)
      : (copyright.textContent = ` Unknown`);

    // Append everything together

    // Footer Append
    footer.append(date, copyright);

    // Body Append
    cardBody.append(cardTitle, saveText, cardText, footer);

    // Wrap image inside <a> element
    link.appendChild(image);

    // Pass everything into the card element
    card.append(link, cardBody);

    imagesContainer.appendChild(card);
  });
}

// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDom();
  } catch (error) {
    console.log(`HERE IS YOUR ERROR: ${error}`);
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation for 2 seonds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
    }
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
  });
}

// Event Listeners

// On Load
getNasaPictures();
