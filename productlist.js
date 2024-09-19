//Når hele HTML-Dokumentet er indlæst, bliver funktionen init kaldt 
window.addEventListener("DOMContentLoaded", init);

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc`;

//Kode for kategoriliste
const categoryList = document.querySelector("#categorylist");
const uniqueCategories = new Set(); // Opretter et tomt Set til at holde unikke kategorier

fetch("https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?select=Taksonomi1", {
  method: "GET",
  headers: {
    apikey: key
  }
})
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach((category) => {
      const categoryName = category['Taksonomi1'];
      
      // Tjekker om kategorien allerede er i sættet
      if (!uniqueCategories.has(categoryName)) {
        uniqueCategories.add(categoryName); // Tilføjes til sættet, hvis den ikke findes
        categoryList.innerHTML += `<li><a href="productlist.html?category=${categoryName}">${categoryName}</a></li>`;
      }
    });
  });

//Kategorier der mangler:
/*
Power Storage & Power Adapters
Computers & Peripheral Devices
Remote-controlled & Robot Devices
 */

// Hent kategori-parametret fra URL'en (husk at det er 'category' her, ikke 'Taksonomi1')

let url, productList, productTemplate;

function init () {
  const params = new URLSearchParams(document.location.search);
  const category = params.get("category");
  url = `https://wqcieablytxowrowovbq.supabase.co/rest/v1/T%26S?Taksonomi1=eq.${category}`
  console.log(url);
  getData();
}
// Tjek om kategori-parametret er til stede i URL'en

function getData() {
productList = document.querySelector("#productListSection");
productTemplate = document.querySelector("#second").content;

  fetch(url, {
    method: "GET",
    headers: {
      apikey: key
    }
  })
  .then((res) => res.json())
  .then((json) => json.forEach(showProduct));
}

function showProduct(product) {
  console.log(product)
  const clone = productTemplate.cloneNode(true);
  clone.querySelector(".topHead").textContent = product.Produktnavnogmodel;
  clone.querySelector(".subtle").textContent = product.Type;
  productList.appendChild(clone);
/*   showData() */
}

/* function showData(items) {
  items.forEach(showImage);
}

function showImage(item) {
  console.log("data item", item);

  const billedeTemplate = document.querySelector("second").content;
  const copy = billedeTemplate.cloneNode(true);

  const image = copy.querySelector("img");
  image.alt = "image of " + item.name;
  image.src = `img/${item.img}`;

  document.querySelector("body").appendChild(image);
} */