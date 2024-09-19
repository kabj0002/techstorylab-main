const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc`;
const categoryList = document.querySelector("#categoryList");
const uniqueCategories = new Set(); // Opretter et tomt Set til unikke kategorier
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Mapping af kategorier til deres respektive SVG-ikoner
const categoryIcons = {
  "audio/photo/video equipment": "img/clarity_camera-line.svg",
  "mobile devices": "img/clarity_camera-line.svg",
  "programmable logic devices": "img/microphone.svg",
  "board games": "img/cable.svg",
  "cables & connectors": "img/electricity.svg",
  "electronic vidual display": "img/sdcard.svg",
};

fetch(
  "https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?select=Taksonomi1",
  {
    method: "GET",
    headers: {
      apikey: key,
    },
  }
)
  .then((response) => response.json())
  .then((categories) => {
    console.log(categories); // Log response data to inspect its structure

    // Tjek om 'data' er et array, før vi bruger forEach
    if (Array.isArray(categories)) {
      categories.forEach((category) => {
        const categoryName = category["Taksonomi1"];

        // Tjekker om kategorien allerede er i sættet
        if (!uniqueCategories.has(categoryName)) {
          uniqueCategories.add(categoryName); // Tilføjes til sættet, hvis den ikke findes

          // Tildeler det rigtige SVG-ikon baseret på kategorinavnet
          const icon = categoryIcons[categoryName] || "img/default-icon.svg"; // fallback-ikon

          // Opretter HTML-struktur for hver kategori
          const categoryCard = `
            <article class="category_card">
              <img src="${icon}" alt="${icon}" />
              <a href="productlist.html?category=${categoryName}">
                ${categoryName}
              </a>
            </article>
          `;
          categoryList.innerHTML += categoryCard;
        }
      });
    }
  });
//   .then(showCategories);

// function showCategories(categories) {
//   categories.forEach(showCategory);
// }
// function showCategory(category) {
//   //Fanger vores template
//   const template = document.querySelector("template").content;
//   //Cloner
//   const clone = template.cloneNode(true);
//   //Ændrer indhold
//   clone.querySelector("a").textContent = category["Taksonomi1"];
//   clone.querySelector(
//     "a"
//   ).href = `produktliste.html?category=${category["Taksonomi1"]}`;

//   //Appenderer
//   document.querySelector("#categoryList").appendChild(clone);
// }
