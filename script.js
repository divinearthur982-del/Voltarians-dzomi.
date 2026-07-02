// Load products from storage or default
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Small Bottle", price: 25, img: "https://images.unsplash.com/photo-1604908176997-125f25cc500f" },
  { name: "Big Gallon", price: 80, img: "https://images.unsplash.com/photo-1604908554007-2c3b3c6d1d0a" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE DATA
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
}

// DISPLAY PRODUCTS
function display(list) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.name}</h3>
      <p>GH₵ ${p.price}</p>
      <button onclick="addToCart(${i})">Add</button>
    `;

    container.appendChild(div);
  });
}

// ADD TO CART
function addToCart(i) {
  cart.push(products[i]);
  saveData();
  alert("Added to cart");
}

// CHECKOUT
function checkout() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;

  let msg = `Hello,%0AName: ${name}%0APhone: ${phone}%0A`;

  cart.forEach(c => {
    msg += `${c.name} - GH₵${c.price}%0A`;
  });

  window.open(`https://wa.me/233245102225?text=${msg}`, "_blank");
}

// SEARCH
function searchProduct() {
  let val = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p => p.name.toLowerCase().includes(val));
  display(filtered);
}

// ADMIN ADD PRODUCT
function addProduct() {
  let name = document.getElementById("pname").value;
  let price = document.getElementById("pprice").value;
  let img = document.getElementById("pimg").value;

  products.push({ name, price, img });
  saveData();
  display(products);
  alert("Product added!");
}

// SWITCH VIEWS
function showAdmin() {
  document.getElementById("adminSection").style.display = "block";
  document.getElementById("shopSection").style.display = "none";
}

function showShop() {
  document.getElementById("adminSection").style.display = "none";
  document.getElementById("shopSection").style.display = "block";
  display(products);
}

// INIT
display(products);