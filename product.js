const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("ID from URL:", id);

window.addEventListener("load", getProduct);

function getProduct() {
  fetch(`https://wqcieablytxowrowovbq.supabase.co/rest/v1/T&S?asset=eq.${id}`, {
    method: "GET",
    headers: {
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxY2llYWJseXR4b3dyb3dvdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4OTY4NDMsImV4cCI6MjA0MTQ3Mjg0M30.SJtYsRbBQPSJuze0h2FncM1plrOh-QLb9N3mfSNjeQc",
    },
  })
    .then((res) => res.json())
    .then(getInfo);
}

function getInfo(products) {
  console.log(products);
  const product = products[0];

  document.querySelector(".title").textContent = product.Taksonomi1;
  document.querySelector(".produkt_navn").textContent = product.Produktnavnogmodel;
  document.querySelector(".mærke").textContent = product.Mærke;
  document.querySelector(".asset_id").textContent = product.asset;
  document.querySelector(".objektkode").textContent = product.Objektkode;
  document.querySelector(".type").textContent = product.Type;
}
